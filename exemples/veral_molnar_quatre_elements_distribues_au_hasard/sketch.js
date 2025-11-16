// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "192.168.1.12";
const SERVER_PORT   = 3000; // à changer en fonction 
const DO_CONNECT    = false;

// ----------------------------------------
// Dimension de la feuille et précision
const DIM_SHEET = DIM_A4;

// ----------------------------------------
let nb = 12; // nombre d'élements sur une ligne
let marginCM = 1.0; // marge (en CM)
let dCM; // dimension d'une cellule (en CM)
let hDessinCM; // hauteur du dessin (en CM) pour pouvoir centrer
let yDessinCM; // Décalage (en CM) pour centre

// ----------------------------------------
function setup() 
{
  let canvas = createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM);
  prepareSketch(canvas, true, DO_CONNECT);
}

// ----------------------------------------
function draw() 
{
  background(255);

  beginSVG();

  // ----------------------------------------
  // <début> Partie éditable pour le dessin
  // choix du nombre d'éléments sur une ligne au hasard entre 1 et 20
  nb = int(random(1,20));
  
  // Calcul des différentes grandeurs
  dCM = (widthCM - 2*marginCM) / nb; 
  hDessinCM = nb * dCM;
  yDessinCM = (heightCM-hDessinCM)/2;

  // Boucle de dessin
  for (let j=0 ; j<nb; j=j+1)
  {
    for( let i=0; i<nb; i=i+1 )
    {
        // Coordonnées de la cellule
        let x = cmToPx(marginCM + i*dCM);
        let y = cmToPx(yDessinCM + j*dCM);
        let d = cmToPx(dCM);
      
        // Choix aléatoire d'un nombre
        let r = int( random(0,4) );

        // Dessin des motifs
        // Motif 0
        if (r == 0)
        {
          line(x,y,x+d,y+d);
        }
        // Motif 1
        else if (r == 1)
        {
          line(x+d,y,x,y+d);
        }
        // Motif 2
        else if (r == 2)
        {
          line(x,y+d/2,x+d,y+d/2);
        }
        // Motif 3
        else if (r == 3)
        {
          line(x+d/2,y,x+d/2,y+d);
        } 
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

