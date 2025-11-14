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

let bb;

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
  for (let i=0;i<3;i++)
  {
    circle(random(marginPx,width-marginPx), random(marginPx,height-marginPx), 60);
  }


  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  if (bb)
  {
    push();
    noFill();
    stroke('#F00');
    rect(bb.x,bb.y,bb.width,bb.height);
    pop();
  }

  if (bDoPlotSvg)
  {
    svgToPlot = endRecordSVG();
    plot(svgToPlot);
    bb = getGlobalSvgBBoxFromString(svgToPlot);
    // console.log(svgToPlot)
    // console.log(bb)

    bDoPlot = false;
  }
}

// ----------------------------------------
function keyPressed() 
{
  if (key == 'p') 
  {
    bDoPlotSvg = true;
  }
}

