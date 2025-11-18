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

  // Variables
  let marginCM = 1.0;
  let nb = 8;
  let wGridCM = widthCM-2*marginCM;

  // Dessin d'une grille de motifs
  if (faces.length>0)
  {
    drawSquareGridCM(
      marginCM, // x
      (heightCM-wGridCM)/2, // petit calcul pour centrer
      wGridCM, // largeur de la feuille - 2 * marge
      nb,
      // Dessin de la cellule
      (xCM,yCM,dCM,i,j)=>
      {
        drawFaceCircles(faces[0],cmToPx(xCM), cmToPx(yCM), cmToPx(dCM), cmToPx(dCM), 2);
      }
    );

  }


  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();


//  image(video, 0, 0);
}

