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

  let marginCM = 1.0;
  let margin = cmToPx(marginCM);
  let wGrilleCM = widthCM - 2*marginCM;
  let wGrille = cmToPx(wGrilleCM);
  let yGrille = cmToPx( (heightCM - wGrilleCM)/2 ); 
  let nb = floor( random(1,20) );


  drawSquareGrid(margin,yGrille,wGrille, nb, (x,y,d)=>
  {
    // rnd vaudra 0,1,2 ou 3 
    let rnd = floor( random(0,2) );
    strokeWeight( cmToPx(0.05) );
    // strokeCap(SQUARE);
    //square(x,y,d)
    if ( rnd == 0)
    {
        //arc( x,y,d,d,0,radians(90));
        //arc( x,y,0.7*d,0.7*d,0,radians(90)); // effet de highlight
        for (let f=0.1; f<=1; f+=0.1)
          arc( x,y,f*d,f*d,0,radians(90));

        for (let f=0.1; f<=1; f+=0.1)
          arc( x+d,y+d,f*d,f*d,radians(180), radians(270));
    }

    if ( rnd == 1)
    {
      for (let f=0.1; f<=1; f+=0.1)
        arc(x+d,y,f*d,f*d,radians(90),radians(180));
      //arc(x+d,y,0.7*d,0.7*d,radians(90),radians(180));
      
      for (let f=0.1; f<=1.2; f+=0.1)
        arc(x,y+d,f*d,f*d,radians(270), radians(360))      
    }
  

  });



  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();
}

