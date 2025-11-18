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
  var nb = 15;
  var d = width / nb; // en pixels
  strokeWeight( cmToPx(0.05) ); // stylo de 0.5 mm
  /*
  circle(d/2 + 0*d, d/2, d);
  circle(d/2 + 1*d, d/2, d);
  circle(d/2 + 2*d, d/2, d)
  circle(d/2 + 3*d, d/2, d)
  circle(d/2 + 4*d, d/2, d)
  */
  noFill();

  // 
  for ( let j = 0; j < nb; j = j+1 )
  {
    for ( let i = 0; i < nb; i = i+1 )
    {
      circle(d/2 + i*d, d/2 + j*d, d);
    //square(i*d, 0, d);
    }
  }
  // repète cette ligne avec i qui va de 0 à 40 
  // circle(d/2 + i*d, d/2, d)


  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();
}

