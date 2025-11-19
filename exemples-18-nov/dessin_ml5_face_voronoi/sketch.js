// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"; // à changer

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "192.168.1.11"; // à changer
const SERVER_PORT   = 3000; // à changer en fonction du plotter
const DO_CONNECT    = true; // se connecte-t-on ou pas ? 
const MODE_SIMPLE   = false; 

// ----------------------------------------
// Dimension de la feuille et précision
const DIM_SHEET = DIM_A4;


// ----------------------------------------
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };

let voronoi, sites;

// ----------------------------------------
function preload() {
  faceMesh = ml5.faceMesh(options);
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
  // Détection de visage
  faceMesh.detectStart(video, gotFaces);
  voronoi = new Voronoi();
}

// ----------------------------------------
function gotFaces(results) 
{
  faces = results;
}

// ----------------------------------------
function draw() 
{
  beginSVG();

  // ----------------------------------------
  // <début> Partie éditable pour le dessin
  background(255);

  // Draw all the tracked face points
  noFill();
  stroke(0);

  let margin = cmToPx(2.0);

  sites = [];
  for (let i = 0; i < faces.length; i++) 
  {
    drawFaceWith( faces[i], margin,margin,width-margin,height-margin, (xFace,yFace) =>
    {
      sites.push( {x:xFace,y:yFace} );
      //circle(xFace,yFace,3)
    })
    
  }

  let O=createVector(width/2,height/2)
  let diagram = voronoi.compute(sites, {xl:margin,xr:width-margin,yt:margin,yb:height-margin});

  simplifyCells(diagram).forEach( vertices =>
  {
    vertices = vertices.map(v=>createVector(...v));
/*
    beginShape();
    vertices.forEach( v=>vertex(...v) )
    endShape(CLOSE);
*/
      let C = getCentroid(vertices);

      let d = map(distV(C,O)/(0.5*height),0,1,3,20);
      getLineStripes2(
        vertices, 
        atan2(C.y-O.y,C.x-O.x), 
        d , null, {'clip':true}
      ).forEach( l=>
      {
        line(l[0].x,l[0].y,l[1].x,l[1].y);
      })

    })



  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();


//  image(video, 0, 0);
}

// ----------------------------------------
function simplifyCells(voronoiDiagram)
{
  let cells = [];
  for (let i = 0; i < voronoiDiagram.cells.length; i++) {
    let vertices = [];
    cells.fromDiagram = voronoiDiagram.cells[i]; // attach origin cell here
    for (let j = 0; j < voronoiDiagram.cells[i].halfedges.length; j++) {
      vertices.push([voronoiDiagram.cells[i].halfedges[j].getStartpoint().x, voronoiDiagram.cells[i].halfedges[j].getStartpoint().y]);
    }
    cells.push(vertices);
  }
  console.log(cells.length)
  return cells;
}

function distV(A,B){return dist(A.x,A.y,B.x,B.y)}



