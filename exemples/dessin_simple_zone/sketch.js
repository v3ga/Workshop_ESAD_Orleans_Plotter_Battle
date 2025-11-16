// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"; // à changer

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "191.168.1.11";
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

  // Dessin dans le quart haut gauche de la zone de dessin 
  // Coordonnées : x=0, y=0, w=width/2, h=height/2
  
  beginDraw(0,0,width/2,height/2,false);
    circle(widthDraw/2,heightDraw/2,widthDraw-20);
  endDraw();
  

  // Dessin dans le quart bas droit de la zone de dessin 
  // On précise ici la zone en CM plutôt, cela peut être plus facile
  beginDrawCM(widthCM/2,heightCM/2,widthCM/2,heightCM/2, false);
    rect(cmToPx(0.5),cmToPx(0.5),widthDraw-cmToPx(1.0),widthDraw-cmToPx(1.0));
  endDrawCM();


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

