// ----------------------------------------
let socket, clientId, svgToPlot;

// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "192.168.1.12";
const SERVER_PORT   = 3000; // à changer en fonction 

// ----------------------------------------
// Dimension de la feuille
const DIM_SHEET = {width:21.0,height:29.7}; // cm

// ----------------------------------------
const DPCM = 20;

// ----------------------------------------
let bDoPlot = false;

// ----------------------------------------
function setup() 
{
  clientId = getClientId();

  createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM).parent('container-canvas');
  setSvgResolutionDPCM(DPCM);
  connect();
}

// ----------------------------------------
function draw() 
{
  background(255);
  randomSeed(12345);

  if (bDoPlot)
    beginRecordSVG(this);

  // ----------------------------------------
  // <début> Partie éditable pour le dessin
  let margin = 0.1;
  let marginPx = margin*width;
  noFill();
  stroke(0);
  for (let i=0;i<10;i++)
  {
    circle(random(marginPx,width-marginPx), random(marginPx,height-marginPx), 60);
  }
  // <fin> Partie éditable pour le dessin
  // ----------------------------------------

  if (bDoPlot)
  {
    svgToPlot = endRecordSVG();
    plot(svgToPlot);
    bDoPlot = false;
  }
}

// ----------------------------------------
function keyPressed() 
{
  if (key == 'p') 
  {
    bDoPlot = true;
  }
}

