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
    })
    
  }
  
  let diagram = voronoi.compute(sites, {xl:margin,xr:width-margin,yt:margin,yb:height-margin});

  

  let edges = diagram.edges,nEdges = edges.length;
  if (nEdges) 
  {
    while (nEdges--) 
    {
      edge = edges[nEdges];
      line(edge.va.x,edge.va.y, edge.vb.x, edge.vb.y);
    }
  }

  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();


//  image(video, 0, 0);
}

