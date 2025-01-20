


function drawKnob(canvas,val) {

    // get context and clear for new drawing
    ctx = canvas.getContext("2d");
    let canvasW = canvas.width;
    let canvasH = canvas.height;

    ctx.clearRect(0, 0, canvasW, canvasH);

    let rControl = 0.31;
    let rPix = canvasH*rControl;
    let circStart = PIo2 + PIo4;
    let circEnd   = PIo2 + twoPI - PIo4;
    let xC = canvasW/2;
    let yC = canvasH/2;




    //// draw arc
    // ctx.fillStyle = "hsl(0, 50%, 50%, 0.1)";
    // ctx.strokeStyle = "hsl(200, 0%, 60%, 1.0)";


    ctx.beginPath();
    // ctx.rect(0, 0, canvasW, canvasH);
    // ctx.fill();

    //////////////////////////////////////////////////////////////////////// SHADOW
    ctx.beginPath();
    let rPixShadowX = rPix*0.7;
    let rPixShadowY = rPix*0.8;
    var xC_Offset = 0.03*canvasH;
    var yC_Offset = xC_Offset*4;
    ctx.ellipse(xC+xC_Offset, yC+yC_Offset, rPixShadowX, rPixShadowY, -PIo16, 0, twoPI);
    // ctx.ellipse(xC+1, yC+30, rPixShadowX, rPixShadowY, -PIo16, 0, twoPI);
    ctx.fillStyle = "hsl(0, 0%, 0%, 0.4)";
    // ctx.fill();

    //////////////////////////////////////////////////////////////////////// BOTTOM
    ctx.beginPath();
    let rPix2 = rPix*0.9;
    var xC_Offset = 0.005*canvasH;
    var yC_Offset = 0.03*canvasH;
    ctx.ellipse(xC+xC_Offset, yC+yC_Offset, rPix2, rPix2, 0, 0, twoPI);
    // ctx.ellipse(xC+2, yC+15, rPix2, rPix2, 0, 0, twoPI);
    ctx.fillStyle = "hsl(" + hueKnobBottom + ", " + satKnobBottom + "%, " + litKnobBottom + "%, " + alphaKnobBottom + ")";
    // ctx.fillStyle = "hsl(150, 10%, 6%, 1.0)";
    ctx.fill();

    //////////////////////////////////////////////////////////////////////// TOP
    ctx.beginPath();
    // ctx.ellipse(xC, yC, rPix, rPix, 0, circStart, circEnd);

    ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);

    ctx.fillStyle = "hsl(150, 15%, 50%, 0.3)";
    ctx.fill();

    ctx.lineWidth = 0.01*canvasH;
    ctx.strokeStyle = "hsl(150, 30%, 85%, 0.2)";
    // ctx.strokeStyle = "hsl(" + hueUI1 + satUI2 + "%, " + litUI1 + "%, " + "0.1)";

    ctx.stroke();



    var theta = circStart + val * (circEnd-circStart); 

    // ctx.strokeStyle = "hsl(200, 0%, 30%, 1.0)";
    // ctx.beginPath();
    // ctx.ellipse(xC, yC, rPix, rPix, 0, circStart, theta);
    // ctx.lineWidth = 2.5;
    // ctx.stroke();

    //// draw handle
    // xC = canvasW/2  + Math.cos(theta)*rControl*canvasH;
    // yC = canvasH/2 + Math.sin(theta)*rControl*canvasH;
    // rPix = canvasH/32;
    // ctx.fillStyle = "hsl(0, 0%, 30%, 1.0)";
    // ctx.beginPath();
    // ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);
    // ctx.fill();

    //////////////////////////////////////////////////////////////////////// NEEDLE
    // theta = circStart + val * (circEnd-circStart); 
    let rNeedleStart = 0.1;
    x1 = canvasW/2  + Math.cos(theta)*rNeedleStart*canvasH;
    y1 = canvasH/2 + Math.sin(theta)*rNeedleStart*canvasH;
    x2 = canvasW/2  + Math.cos(theta)*rControl*canvasH;
    y2 = canvasH/2 + Math.sin(theta)*rControl*canvasH;
    ctx.strokeStyle = "hsl(" + hueKnobNeedle + ", " + satKnobNeedle + "%, " + litKnobNeedle + "%, " + alphaKnobNeedle + ")";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}


function drawKnob01(canvas,val) {

    // get context and clear for new drawing
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let rControl = 0.3;
    let rPix = canvasH*rControl;
    let circStart = PIo2 + PIo4;
    let circEnd   = PIo2 + twoPI - PIo4;
    let xC = canvasW/2;
    let yC = canvasH/2;




    //// draw arc
    ctx.fillStyle = "hsl(0, 50%, 50%, 0.1)";
    ctx.strokeStyle = "hsl(200, 0%, 60%, 1.0)";
    ctx.lineWidth = 2;


    ctx.beginPath();
    // ctx.rect(0, 0, canvasW, canvasH);
    // ctx.fill();

    ctx.beginPath();
    ctx.ellipse(xC, yC, rPix, rPix, 0, circStart, circEnd);
    // ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);
    ctx.stroke();


    var theta = circStart + val * (circEnd-circStart); 
    ctx.strokeStyle = "hsl(200, 0%, 30%, 1.0)";
    ctx.beginPath();
    ctx.ellipse(xC, yC, rPix, rPix, 0, circStart, theta);
    ctx.lineWidth = 2.5;
    ctx.stroke();

    //// draw handle
    xC = canvasW/2  + Math.cos(theta)*rControl*canvasH;
    yC = canvasH/2 + Math.sin(theta)*rControl*canvasH;
    rPix = canvasH/32;
    ctx.fillStyle = "hsl(0, 0%, 30%, 1.0)";
    ctx.beginPath();
    ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);
    ctx.fill();

    //// draw needle
    // theta = circStart + val * (circEnd-circStart); 
    // x1 = canvasW/2;
    // y1 = canvasH/2;
    // x2 = canvasW/2  + Math.cos(theta)*rControl*canvasH;
    // y2 = canvasH/2 + Math.sin(theta)*rControl*canvasH;
    // ctx.strokeStyle = "hsl(0, 0%, 30%, 1.0)";
    // ctx.beginPath();
    // ctx.moveTo(x1,y1);
    // ctx.lineTo(x2, y2);
    // ctx.stroke();
}
