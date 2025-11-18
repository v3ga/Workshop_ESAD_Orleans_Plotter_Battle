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

  // Variables
  let marginCM = 3.0;
  let nb = 10;
  let wGridCM = widthCM-2*marginCM;

  // Dessin d'une grille de motifs
  drawSquareGridCM(
    marginCM, // x
    (heightCM-wGridCM)/2, // petit calcul pour centrer
    wGridCM, // largeur de la feuille - 2 * marge
    nb,
    // Dessin de la cellule
    (xCM,yCM,dCM,i,j)=>
    {
      // Dessin d'une cellule ici : 
      // xCellCM,yCellCM la position de la cellule sur la feuille (en CM)
      // dCM sa dimension
      // i,j numéro de la cellule
      square(cmToPx(xCM), cmToPx(yCM), cmToPx(dCM));


      // Square utilise des coordonnées en pixels, il faut qu'on les transforme
      /*
      rectMode(CENTER); // permet de dessiner le carré à partir de son centre, plus pratique si on veut le faire pivoter
      push();
      translate(cmToPx(xCM+dCM/2),cmToPx(yCM+dCM/2))
      rotate( random(0,radians(90)) );
      square(0,0,1.5*cmToPx(dCM));
      pop();
      */

      // circle(cmToPx(xCM+dCM/2),cmToPx(yCM+dCM/2),1*cmToPx(dCM));
  });


  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();
}

