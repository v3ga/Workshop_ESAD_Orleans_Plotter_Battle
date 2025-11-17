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
  // background(200,230,140); // R,V,B
  background('#dddddd');
  /*
  point(50,100); // x,y
  point(200,500); // x,y

  line(50,100, 200,500); // x1,y1, x2,y2
  line(200,500, 400,123);
  line(250,600, 600,800);
  // line(30,400,200) // pas la bonne syntaxe

  // Dessin avec des unités en px
  circle(300,400,400);

  // Dessin avec des unités en CM
  circle( cmToPx(3) , cmToPx(5), cmToPx(4) );
  noFill();
  circle( cmToPx(3+4) , cmToPx(5), cmToPx(4) );
  circle( cmToPx(3) , cmToPx(5+4), cmToPx(4) );

  rect( cmToPx(3), cmToPx(29.7/2),    cmToPx(10), cmToPx(5) );
  rect( cmToPx(3), cmToPx(29.7/2+5),  cmToPx(10), cmToPx(5) );

  strokeWeight( cmToPx(0.05) ); // 0.5mm = 0.05cm
  square( cmToPx(21/2), cmToPx(29.7/2), cmToPx(2) );
  */
  

  translate( cmToPx(21/2), cmToPx(29.7/2) ); // décalage des formes 
  scale(0.5); // divise l'échelle par 2
  rotate( radians(360/2) ); // fait pivoter de 45 degrés
  strokeWeight( cmToPx(0.05) );
  noFill();
  beginShape();
  vertex(50,100);
  vertex(200,70);
  vertex(400,300);
  vertex(250,400);
  vertex(30,220);
  endShape(CLOSE); // CLOSE : ligne du dernier au premier point

  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();
}

