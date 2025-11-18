// ----------------------------------------
// PSEUDO
const PSEUDO = "Julien"; // à changer

// ----------------------------------------
// IP (adresse) du serveur d'impression
const SERVER_IP     = "192.168.1.11"; // à changer
const SERVER_PORT   = 3000; // à changer en fonction du plotter
const DO_CONNECT    = true; // se connecte-t-on ou pas ? 
const MODE_SIMPLE   = false; 

// ----------------------------------------
// Dimension de la feuille et précision
const DIM_SHEET = DIM_A4;

// ----------------------------------------
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: true };
let facesTime = [];

// ----------------------------------------
function preload() 
{
  faceMesh = ml5.faceMesh(options);
}

// ----------------------------------------
function setup() 
{
  let canvas = createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM);
  prepareSketch(canvas, MODE_SIMPLE, DO_CONNECT);

  // Création de la vidéo
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Détection de visage
  faceMesh.detectStart(video, gotFaces);
}

// ----------------------------------------
function draw() 
{
  beginSVG();

  // ----------------------------------------
  // <début> Partie éditable pour le dessin
  background(255);

  // Draw all the tracked face points
  noFill();
  stroke(0);

  // Variables
  let marginCM = 1.0;
  let nb = 7;
  let wGridCM = widthCM-2*marginCM;

  // Dessin d'une grille de motifs
  if (faces.length>0)
  {
    let points = normalizeFaceKeypoints(faces[0].keypoints);
    facesTime.unshift( faceCopyPoints(points) );
    if (facesTime.length > nb*nb)
      facesTime.pop();

    drawSquareGridCM(
      marginCM, // x
      (heightCM-wGridCM)/2, // petit calcul pour centrer
      wGridCM,
      nb,
      // Dessin de la cellule
      (xCM,yCM,dCM,i,j)=>
      {
        let offset = i+nb*j;
        if (facesTime[offset])
        {
          let 
          x = cmToPx(xCM), 
          y = cmToPx(yCM), 
          d = cmToPx(dCM);

          // Dessin les points du visage 
          drawFaceWith( facesTime[offset],x,y,d,d, (xPointFace, yPointFace)=>
          {
              // xPointFace, yPointFace sont à l'intérieur du carré (x,y,d,d)
              circle( xPointFace, yPointFace, 2 )
          })
        }
      }
    );
  }

  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();


//  image(video, 0, 0);
}


// ----------------------------------------
function gotFaces(results) 
{
  faces = results;
}