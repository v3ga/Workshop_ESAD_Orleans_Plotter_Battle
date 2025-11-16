// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"; // à changer

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "192.168.1.11"; // à changer
const SERVER_PORT   = 3000; // à changer en fonction du plotter
const DO_CONNECT    = true; // se connecte-t-on ou pas ? 

// ----------------------------------------
// Dimension de la feuille et précision
const DIM_SHEET = DIM_A4;

// ----------------------------------------
let lignes = [], ligne;
// ----------------------------------------
function setup() 
{
  let canvas = createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM);
  prepareSketch(canvas, false, DO_CONNECT);
}

// ----------------------------------------
function draw() 
{
  beginSVG();

  // ----------------------------------------
  // <début> Partie éditable pour le dessin
  background(255);
  noFill();

  if (mouseIsPressed)
  {
    if (ligne) ligne.push([mouseX,mouseY])
  }


  lignes.forEach( ligne=>
  {
    beginShape();
    ligne.forEach( v=>vertex(v[0],v[1]) );
    endShape();
  })

  if (ligne && ligne.length>=2)
  {
    beginShape();
    ligne.forEach( v=>vertex(v[0],v[1]) );
    endShape();
  }


  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();
}

// ----------------------------------------
function mousePressed()
{
  ligne = [];
}

// ----------------------------------------
function mouseReleased()
{
  if (ligne) lignes.push(ligne);
  ligne = null;
}

