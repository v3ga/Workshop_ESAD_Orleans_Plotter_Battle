// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"; // à changer

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "192.168.1.11"; // à changer
const SERVER_PORT   = 3000; // à changer en fonction du plotter
const DO_CONNECT    = true; // se connecte-t-on ou pas ? 
const MODE_SIMPLE   = false; 

const DEBUG_DRAW_HAND_INDEX = true;

// ----------------------------------------
// Dimension de la feuille et précision
const DIM_SHEET = DIM_A4;


// ----------------------------------------
let video, handPose, hands=[];
let options = 
{
  maxHands: 2,
  flipped: true,
}

// ----------------------------------------
function preload() {
  handPose = ml5.handPose(options);
}

// ----------------------------------------
function setup() 
{
  let canvas = createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM);
  prepareSketch(canvas, MODE_SIMPLE, DO_CONNECT);
  // Création de la vidéo
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Détection des mains
  handPose.detectStart(video, gotHands);
}

// ----------------------------------------
function draw() 
{
  beginSVG();

  // ----------------------------------------
  // <début> Partie éditable pour le dessin
  background(255);

  noFill();
  stroke(0);

  let margin = cmToPx(4.0)

  for (let i = 0; i < hands.length; i++) 
  {
    drawHandWith(hands[i],margin,margin,width-2*margin,height-2*margin);
  }

  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();

}

// ----------------------------------------
function gotHands(results)
{
  hands = results;
}

// ----------------------------------------
function scaleKeypoints(keypoints,x,y,w,h)
{
  return keypoints.map(k=>createVector( map(k.x,0,video.width,x,x+w), map(k.y,0,video.height,y,y+h) ))
}

// ----------------------------------------
function drawHandWith(hand, x,y,w,h, cbDraw)
{
  scaleKeypoints(hand.keypoints, x,y,w,h).forEach( (k,i)=>{
    if (isFunction(cbDraw))
      cbDraw(i,k.x,k.y);
    else 
      circle(k.x,k.y,5);

    if (DEBUG_DRAW_HAND_INDEX)
      text(`${i}`, k.x+5, k.y);
  })
}

