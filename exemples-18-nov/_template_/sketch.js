// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"; // à changer

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "192.168.35.112"; // à changer
const SERVER_PORT   = 3000; // à changer en fonction du plotter
const DO_CONNECT    = false; // se connecte-t-on ou pas ? 

// ----------------------------------------
// Dimension de la feuille et précision
const DIM_SHEET = DIM_A4;

// ----------------------------------------
function setup() 
{
  let canvas = createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM);
  prepareSketch(canvas, true, DO_CONNECT);
}

// ----------------------------------------
function draw() 
{
  beginSVG();

  // ----------------------------------------
  // <début> Partie éditable pour le dessin
  background(255);



  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();
}

