// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"; // à changer

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "192.168.1.12";
const SERVER_PORT   = 3000; // à changer en fonction du plotter
const DO_CONNECT    = false; // se connecte-t-on ou pas ? 

// ----------------------------------------
// Dimension de la feuille
const DIM_SHEET = DIM_A4;

// ----------------------------------------
let res_x, res_y; // nombre de carrés en x et y
let hDessinCM; // hauteur du dessin (en CM)
let dCM; // taille d'un carré (en CM)
let marginCM = 3.0; // marge (en CM)

// ----------------------------------------
function setup() 
{
  let canvas = createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM);
  prepareSketch(canvas, true, DO_CONNECT);
}

// ----------------------------------------
function draw() 
{
  // Nombre de cellules en x au hasard en 5 et 20
  res_x = int(random(5,20));

  // Le nombre de cellules en y est calculé en fonction du ration de la feuille
  res_y = int(heightCM / widthCM * res_x);

  // Calcul de la taille d'un carré (en CM)
  dCM = (widthCM - 2*marginCM)/res_x;

  // On calcule la hauteur totale (en CM) 
  hDessinCM = res_y * dCM;

  // Décalage pour centrer le dessin
  yDessinCM = (heightCM-hDessinCM)/2;  

  beginSVG();

  // ----------------------------------------
  // <début> Partie éditable pour le dessin
  background(255);
  noFill();
  for (let j=0 ; j<res_y; j=j+1)
  {
    for( let i=0; i<res_x; i=i+1 )
    {
      let x = cmToPx(marginCM + i*dCM);
      let y = cmToPx(yDessinCM + j*dCM);

      push();
      translate(x,y)
      rotate( map(j,0,res_y-1,0,1)*random(-PI/4,PI/4) );
      square(0,0,cmToPx(dCM));
      pop();
    }
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

