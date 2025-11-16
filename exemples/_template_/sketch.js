// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "192.168.1.12";
const SERVER_PORT   = 3000; // à changer en fonction du plotter

// ----------------------------------------
// Dimension de la feuille et précision
const DIM_SHEET = {width:21.0,height:29.7}; // cm
const DPCM = 30;

// ----------------------------------------
function setup() 
{
  let canvas = createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM);
  prepare_sketch(canvas, true);
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

// ----------------------------------------
function keyPressed() 
{
  if (key == 'p') 
  {
    bCreateSvg = true;
  }
}

