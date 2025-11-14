// ----------------------------------------
let socket, clientId, svgToPlot;

// ----------------------------------------
const DPCM = 30;

// ----------------------------------------
let bDoPlotSvg = false;

// ----------------------------------------
function setup() 
{
  clientId = getClientId();

  let canvas = createCanvas(DIM_SHEET.width*DPCM, DIM_SHEET.height*DPCM).parent('container-canvas');
  canvas.elt.removeAttribute('style');
  setSvgResolutionDPCM(DPCM);
  connect();
  console.log(width,height)
}
