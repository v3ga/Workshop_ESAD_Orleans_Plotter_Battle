// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "192.168.1.12";
const SERVER_PORT   = 3000; // à changer en fonction 

// ----------------------------------------
// Dimension de la feuille et précision
const DIM_SHEET = DIM_A4;
const DPCM = 30;

// ----------------------------------------
let prevx,prevy;
// ----------------------------------------
function setup() 
{
  let canvas = createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM);
  prepare_sketch(canvas, true);
}

// ----------------------------------------
function draw() 
{
  background(255);

  beginSVG();

  // ----------------------------------------
  // <début> Partie éditable pour le dessin
  stroke(0);
  let margin = 0.1*width;
  for (let i=0;i<100;i++)
  {
    let x1 = prevx??random(margin,width-margin);
    let y1 = prevy??random(margin,height-margin);
    let x2 = random(margin,width-margin);
    let y2 = random(margin,height-margin);
    line(x1,y1,x2,y2);
    prevx = x2;
    prevy = y2;
  }

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

