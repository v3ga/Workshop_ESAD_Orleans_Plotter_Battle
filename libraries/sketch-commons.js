const DPCM = 30;
var DIM_A4 = {width:21.0, height:29.7};
var DIM_A3 = {width:29.7, height:42.0};
var widthDraw,heightDraw;

function cmToPx(cm)
{
    return DPCM * cm;
}

function pxToCm(px)
{
    return px / DPCM;
}

function beginDraw(x,y,w,h,bDrawZone=false)
{
    push();
    translate(x,y);
    if (bDrawZone)
    {
        push();
        noFill();
        strokeWeight(2);
        stroke(255,0,0);
        rect(0,0,w,h);
        pop();
    }
    widthDraw = w;
    heightDraw = h;
}

function endDraw()
{
    pop();
}

function beginDrawCM(x,y,w,h,bDrawZone=false)
{
    beginDraw(cmToPx(x),cmToPx(y),cmToPx(w),cmToPx(h), bDrawZone);
}

function endDrawCM()
{
    endDraw();
}
