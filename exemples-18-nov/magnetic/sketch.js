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
var res = 10
var grid_X
var grid_Y

// ----------------------------------------
function setup() 
{
  let canvas = createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM);
  prepareSketch(canvas, true, DO_CONNECT);

    grid_X = new Array(width / res);
    grid_Y = new Array(width / res);
    for (var i = 0; i < width / res; i++) {
      console.log(height / res)
        grid_X[i] = new Array(int(height / res));
        grid_Y[i] = new Array(int(height / res));
    }
    c1 = new Charge(100, 200, 30)
    c2 = new Charge(600, 500, -20)

    vectorGrid()  
}

// ----------------------------------------
function draw() 
{
  beginSVG();

  // ----------------------------------------
  // <début> Partie éditable pour le dessin
  background(255);

    drawGrid()
    c1.display()
    c2.display()
    drawLines()

  // <fin> Partie éditable pour le dessin
  // ----------------------------------------
  endSVG();
}


function Charge(x, y, v) {
    this.x = x
    this.y = y
    this.v = v


    this.display = function() {
        if (this.v > 0) {
            fill(255, 0, 0, 100);
        } else if (this.v < 0) {
            fill(0, 0, 255, 100);
        }
        stroke(0);
        strokeWeight(1);
        ellipse(this.x, this.y, 15, 15);
    }
}


function drawGrid() {
    stroke(0, 50)
    for (var i = 0; i < width; i += 20) {
        line(0, i, width, i)
        line(i, 0, i, height)

    }
}

function vectorGrid() {
    //print("Vector grid")
    var x1 = 0;
    for (var i = 0; i < height / res; i++) {
        for (var j = 0; j < height / res; j++) {
            x = res / 2 + i * res
            y = res / 2 + j * res
            dx = x - c1.x;
            dy = y - c1.y;
            d1 = sqrt(dx * dx + dy * dy);
            E1 = c1.v / (d1 * d1);
            E1x = dx * E1 / d1;
            E1y = dy * E1 / d1;

            dxn = x - c2.x;
            dyn = y - c2.y;
            d2 = sqrt(dxn * dxn + dyn * dyn);
            E2 = c2.v / (d2 * d2);
            E2x = dxn * E2 / d2;
            E2y = dyn * E2 / d2;

            EEx = E1x + E2x;
            EEy = E1y + E2y;
            EE = sqrt(EEx * EEx + EEy * EEy);

            deltax = 15 * EEx / EE;
            deltay = 15 * EEy / EE;
            grid_X[i][j] = deltax
            grid_Y[i][j] = deltay



        }

    }
}

function drawLines() {


    for (var i = 0; i < 5000; i++) {


        x = random(width);
        var xf = floor(x / (res));
        y = random(height);
        var yf = floor(y / (res));

        stroke(0, 70)
        line(x, y, x + grid_X[xf][yf], y + grid_Y[xf][yf])


    }
}
