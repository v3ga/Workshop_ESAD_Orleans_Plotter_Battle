// --- DOM ---
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const info = document.getElementById('info');

const btnStart = document.getElementById('btn-start');
const btnStop = document.getElementById('btn-stop');
const btnCapture = document.getElementById('btn-capture');
const btnSaveSVG = document.getElementById('btn-save-svg');
const btnPlotSVG = document.getElementById('btn-plot-svg');
const btnClear = document.getElementById('btn-clear');
const btnFS = document.getElementById('btn-fs');

// --- 상태 ---
let cameraWrapper = null;
let latestContours = [];
let frozenContours = []; // 누적 저장

// --- 서버 연결 정보 ---
const SERVER_IP = "192.168.36.64";
const SERVER_PORT = 3000;

// --- 캔버스 A4 ---
/*
canvas.width = 1200;
canvas.height = 1696;
*/
canvas.width = 1696;
canvas.height = 1200;
canvas.style = 'height:100%;width:auto';

// --- MediaPipe FaceMesh 초기화 ---
const faceMesh = new FaceMesh({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
});
faceMesh.setOptions({
  maxNumFaces: 6,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
faceMesh.onResults(onFaceResults);

// --- RDP 단순화 ---
function simplifyRDP(points, epsilon){
  if(points.length<3) return points;
  const sqDist = (p1,p2) => (p1.x-p2.x)**2 + (p1.y-p2.y)**2;
  const perpendicularDistance = (pt,lineStart,lineEnd) => {
    const dx=lineEnd.x-lineStart.x;
    const dy=lineEnd.y-lineStart.y;
    const mag=dx*dx+dy*dy;
    if(mag===0) return Math.sqrt(sqDist(pt,lineStart));
    const u=((pt.x-lineStart.x)*dx + (pt.y-lineStart.y)*dy)/mag;
    const x=lineStart.x+u*dx;
    const y=lineStart.y+u*dy;
    return Math.sqrt(sqDist(pt,{x,y}));
  };
  let maxDist=0,index=0;
  for(let i=1;i<points.length-1;i++){
    const dist=perpendicularDistance(points[i],points[0],points[points.length-1]);
    if(dist>maxDist){ index=i; maxDist=dist; }
  }
  if(maxDist>epsilon){
    const left=simplifyRDP(points.slice(0,index+1),epsilon);
    const right=simplifyRDP(points.slice(index),epsilon);
    return left.slice(0,-1).concat(right);
  } else return [points[0], points[points.length-1]];
}

// --- 얼굴 핵심 랜드마크 선택 ---
function getKeyLandmarks(landmarks){
  if(!landmarks || landmarks.length===0) return [];

  const faceOutlineIdx=[10,338,297,332,284,251,389,356,454,323,361,288,
    397,365,379,378,400,377,152,148,176,149,150,136,172];

  const leftEyeIdx=[33,133,160,159,158,157,173,246,161,163,144];
  const rightEyeIdx=[263,362,387,386,385,384,398,466,373,380,381];

  const noseIdx=[1,2,98,327,168,6,197];

  const mouthIdx=[61,291,78,308,191,80,13,14,312,311,310];

  const indices=[...faceOutlineIdx,...leftEyeIdx,...rightEyeIdx,...noseIdx,...mouthIdx];
  const points=indices.map(i=>landmarks[i]).filter(p=>p && p.x!==undefined && p.y!==undefined);
  return points;
}

// --- 얼굴 윤곽 처리 ---
function onFaceResults(results){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  latestContours=[];
  
  if(results.multiFaceLandmarks && results.multiFaceLandmarks.length>0){
    results.multiFaceLandmarks.forEach(landmarks=>{
      const keyPoints=getKeyLandmarks(landmarks);
      if(keyPoints.length>1){
        latestContours.push(keyPoints);
        drawContour(keyPoints);
      }
    });
  }

  if(frozenContours.length>0){
    frozenContours.forEach(contour=>drawContour(contour));
  }
}

// --- 윤곽선 그리기 ---
function drawContour(landmarks){
  const simplified = simplifyRDP(
    landmarks.map(lm=>({x:lm.x*canvas.width, y:lm.y*canvas.height})),
    4
  );
  if(simplified.length<2) return;
  ctx.strokeStyle='black';
  ctx.lineWidth=1.2;
  ctx.beginPath();
  simplified.forEach((pt,i)=>{
    const x=canvas.width-pt.x;
    const y=pt.y;
    if(i===0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  });
  ctx.stroke();
}

// --- SVG 생성 (A4 mm 단위 + 서명 추가됨) ---
function generateSVG_mm(){
  const contours = frozenContours.length > 0 ? frozenContours : latestContours;
  if(!contours || contours.length===0) return '';

  const mmWidth = 297, mmHeight = 210;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${mmWidth}mm" height="${mmHeight}mm" viewBox="0 0 ${mmWidth} ${mmHeight}">`;

  contours.forEach(contour=>{
    const simplified = simplifyRDP(
      contour.map(lm=>({x:lm.x*mmWidth, y:lm.y*mmHeight})),
      1
    );
    if(simplified.length<2) return;
    svg += `<path d="`;
    simplified.forEach((pt,i)=>{
      const x = mmWidth - pt.x;
      const y = pt.y;
      if(i===0) svg += `M${x},${y}`;
      else svg += ` L${x},${y}`;
    });
    svg += `" stroke="black" fill="none" stroke-width="0.5"/>`;
  });

  // --- 서명 추가 (회색 / 얇게 / 세리프 / 우하단) ---
  /*
  svg += `
    <text x="${mmWidth - 5}" y="${mmHeight - 5}"
          font-size="6"
          text-anchor="end"
          font-family="Helvetica, Arial, sans-serif"
          stroke="none"
          fill="black">
      Jihu KIM
    </text>
  `;
*/
  svg += `</svg>`;
  return svg;
}

// --- SVG 다운로드 ---
function downloadSVG_mm(){
  const svg = generateSVG_mm();
  if(!svg) return;
  const blob = new Blob([svg], {type:'image/svg+xml'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'faces_contours_a4_accumulated.svg';
  a.click();
  URL.revokeObjectURL(url);
}

// --- 서버 업로드 ---
function plotSVGtoServer_mm()
{
  const svg = generateSVG_mm();
  if(!svg) return;
  fetch(`http://${SERVER_IP}:${SERVER_PORT}/plot`,
  {
    method:'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({'svg' : svg, 'id' : 1234})
  })
  .then( response=>response.json() )
  .then( result => {

    ctx.clearRect(0,0,canvas.width,canvas.height);
    latestContours=[]; 
    frozenContours=[];

  } )
  .catch(e=>
  {
    console.warn(e);
  });
}

// --- 버튼 이벤트 ---
btnStart.onclick=()=>{
  if(cameraWrapper) return;
  cameraWrapper = new Camera(video,{
    onFrame:()=>faceMesh.send({image:video}),
    width:380,
    height:380
  });
  cameraWrapper.start();
  info.textContent='Caméra activée';
};

btnStop.onclick=()=>{
  if(cameraWrapper) cameraWrapper.stop();
  cameraWrapper=null;
  info.textContent='Caméra arrêtée';
};

btnCapture.onclick=()=>{
  if(latestContours.length>0){
    latestContours.forEach(face=>{
      frozenContours.push(face.slice());
    });
  }
  info.textContent='Contours figés (accumulé)';
};

btnSaveSVG.onclick=()=>downloadSVG_mm();
btnPlotSVG.onclick=()=>plotSVGtoServer_mm();

btnClear.onclick=()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  latestContours=[]; 
  frozenContours=[];
  info.textContent='Canvas effacé';
};

btnFS.onclick=()=>{
  goFullscreen();
}


function goFullscreen() {
  const elem = document.documentElement; // ou n'importe quel élément
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { // Safari
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE11
    elem.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { // Safari
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE11
    document.msExitFullscreen();
  }
}