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

  // line(0,0,width,height);
  // line(width,0,0,height);

  // line(0,0, cmToPx(widthCM), cmToPx(heightCM) )

  drawSquareGrid( 100,100,width/4, 5, (x,y,d)=>{

    // dessin d'une cellule de la grille
    // (x,y,d) d = taille de la cellule en pixels
    // circle( x+d/2,y+d/2, 1.5*d );

    push();
    // Dessin des carrés depuis le centre
    rectMode(CENTER);
    translate(x,y);
    rotate( radians( random(-10,10) ) );
    scale( random(0.5,1.5) )
    square( 0,0,d );
    pop();

  })


    drawSquareGrid( 100,500,width/2, 5, (x,y,d)=>{

    // dessin d'une cellule de la grille
    // (x,y,d) d = taille de la cellule en pixels
    // circle( x+d/2,y+d/2, 1.5*d );


    push();
    // Dessin des carrés depuis le centre
    rectMode(CENTER);
    translate(x,y);
    rotate( radians( random(-30,30) ) );
    scale( random(0.75,1.5) )
    // square( 0,0,d );
    drawSquareGrid(0,0,d,4, (x_,y_,d_)=>{

      circle(x_,y_, random(0.25,1.5) * d_)

    });
    pop();

  })


  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();
}

