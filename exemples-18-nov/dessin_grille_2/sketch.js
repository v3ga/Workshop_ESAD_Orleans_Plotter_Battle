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

  let marginCM = 3.0;
  let margin = cmToPx(marginCM);
  let wGrilleCM = widthCM - 2*marginCM;
  let wGrille = cmToPx(wGrilleCM);
  let yGrille = cmToPx( (heightCM - wGrilleCM)/2 ); 
  let nb = floor( random(1,20) );


  drawSquareGrid(margin,yGrille,wGrille, nb, (x,y,d)=>
  {
    // rnd vaudra 0,1,2 ou 3 
    let rnd = floor( random(0,4) );
    strokeWeight( cmToPx(0.2) );
    // strokeCap(SQUARE);
    // Si la valeur rnd vaut 0
    if ( rnd == 0 )
    {
      line(x,y,x+d,y+d);
    }
    if ( rnd == 1)
    {
      line(x+d,y, x, y+d);
    }
    if ( rnd == 2)
    {
      line(x,y+d/2,x+d,y+d/2);
    }
    if ( rnd == 3)
    {
      line(x+d/2,y, x+d/2, y+d);
    }



  });



  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();
}

