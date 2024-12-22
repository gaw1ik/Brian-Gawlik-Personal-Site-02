


function drawKnob(canvas,val) {

    // get context and clear for new drawing
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let rControl = 0.3;
    let rPix = HEIGHT*rControl;
    let circStart = PIo2 + PIo4;
    let circEnd   = PIo2 + twoPI - PIo4;
    let xC = WIDTH/2;
    let yC = HEIGHT/2;




    //// draw arc
    // ctx.fillStyle = "hsl(0, 50%, 50%, 0.1)";
    // ctx.strokeStyle = "hsl(200, 0%, 60%, 1.0)";
    ctx.lineWidth = 2;


    ctx.beginPath();
    // ctx.rect(0, 0, WIDTH, HEIGHT);
    // ctx.fill();

    // SHADOW
    ctx.beginPath();
    let rPixShadowX = rPix*0.7;
    let rPixShadowY = rPix*1.0;
    // ctx.ellipse(xC+10, yC+5, rPix, rPix, 0, circStart, circEnd);
    ctx.ellipse(xC+1, yC+40, rPixShadowX, rPixShadowY, -PIo16, 0, twoPI);
    ctx.fillStyle = "hsl(0, 0%, 50%, 0.1)";
    ctx.fill();

    // SHAFT
    ctx.beginPath();
    let rPix2 = rPix*0.9;
    ctx.ellipse(xC+1, yC+10, rPix2, rPix2, 0, 0, twoPI);
    ctx.fillStyle = "hsl(200, 0%, 40%, 1.0)";
    ctx.fill();

    // TOP
    ctx.beginPath();
    // ctx.ellipse(xC, yC, rPix, rPix, 0, circStart, circEnd);
    // ctx.strokeStyle = "hsl(200, 0%, 60%, 1.0)";
    // ctx.stroke();
        ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);

    ctx.fillStyle = "hsl(200, 50%, 70%, 1.0)";
    ctx.fill();



    var theta = circStart + val * (circEnd-circStart); 

    // ctx.strokeStyle = "hsl(200, 0%, 30%, 1.0)";
    // ctx.beginPath();
    // ctx.ellipse(xC, yC, rPix, rPix, 0, circStart, theta);
    // ctx.lineWidth = 2.5;
    // ctx.stroke();

    //// draw handle
    // xC = WIDTH/2  + Math.cos(theta)*rControl*HEIGHT;
    // yC = HEIGHT/2 + Math.sin(theta)*rControl*HEIGHT;
    // rPix = HEIGHT/32;
    // ctx.fillStyle = "hsl(0, 0%, 30%, 1.0)";
    // ctx.beginPath();
    // ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);
    // ctx.fill();

    // draw needle
    // theta = circStart + val * (circEnd-circStart); 
    let rNeedleStart = 0.1;
    x1 = WIDTH/2  + Math.cos(theta)*rNeedleStart*HEIGHT;
    y1 = HEIGHT/2 + Math.sin(theta)*rNeedleStart*HEIGHT;
    x2 = WIDTH/2  + Math.cos(theta)*rControl*HEIGHT;
    y2 = HEIGHT/2 + Math.sin(theta)*rControl*HEIGHT;
    ctx.strokeStyle = "hsl(0, 0%, 30%, 0.5)";
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
    let rPix = HEIGHT*rControl;
    let circStart = PIo2 + PIo4;
    let circEnd   = PIo2 + twoPI - PIo4;
    let xC = WIDTH/2;
    let yC = HEIGHT/2;




    //// draw arc
    ctx.fillStyle = "hsl(0, 50%, 50%, 0.1)";
    ctx.strokeStyle = "hsl(200, 0%, 60%, 1.0)";
    ctx.lineWidth = 2;


    ctx.beginPath();
    // ctx.rect(0, 0, WIDTH, HEIGHT);
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
    xC = WIDTH/2  + Math.cos(theta)*rControl*HEIGHT;
    yC = HEIGHT/2 + Math.sin(theta)*rControl*HEIGHT;
    rPix = HEIGHT/32;
    ctx.fillStyle = "hsl(0, 0%, 30%, 1.0)";
    ctx.beginPath();
    ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);
    ctx.fill();

    //// draw needle
    // theta = circStart + val * (circEnd-circStart); 
    // x1 = WIDTH/2;
    // y1 = HEIGHT/2;
    // x2 = WIDTH/2  + Math.cos(theta)*rControl*HEIGHT;
    // y2 = HEIGHT/2 + Math.sin(theta)*rControl*HEIGHT;
    // ctx.strokeStyle = "hsl(0, 0%, 30%, 1.0)";
    // ctx.beginPath();
    // ctx.moveTo(x1,y1);
    // ctx.lineTo(x2, y2);
    // ctx.stroke();
}
