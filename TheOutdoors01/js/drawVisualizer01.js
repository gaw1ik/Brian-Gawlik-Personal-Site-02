




function drawVisualizer() {

    let canvas = canvasViz01;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let rms = device.parametersById.get("master_rms").value;

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    [hue,sat,lit] = [150,30,20];
    alpha = 255;
    lw = 0;
    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, lw, hue, sat, lit, alpha, 0);

    // let val = Math.tanh((rms+0.4)*4.0);

    let rMax = 0.8;

    MASTER_GAIN = device.parametersById.get("master_gain").value;

    let rmsScaled = (rms)/(MASTER_GAIN+0.001);

    // console.log("rmsScaled",rmsScaled);


    let mag = 0.1*rmsScaled;

    // console.log("mag",mag);


    let shape = SHAPES[0];

    let [xC1,yC1] = [shape.xC1+randomSign()*mag, shape.yC1+randomSign()*mag];
    let [xC2,yC2] = [shape.xC2+randomSign()*mag, shape.yC2+randomSign()*mag]

    bezCurve = [];
    bezCurve[0] = [[-artboardWo2-0.6,0.0],[xC1,yC1],[xC2,yC2],[artboardWo2+0.6,1.0]];
    
    // console.log([[-artboardWo2-0.6,0.0],[xC1,yC1],[xC2,yC2],[artboardWo2+0.6,1.0]]);
    [hue,sat,lit] = [150,30,22];
    alpha = 255;
    lw = 0.7;
    drawBezierCurve(ctx,bezCurve, lw, hue, sat, lit, alpha, 1, 0)


    shape.xC1 = xC1;
    shape.yC1 = yC1;
    shape.xC2 = xC1;
    shape.yC2 = yC2;
    


}


function drawVisualizer01(canvas,rms) {

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // let val = Math.tanh((rms+0.4)*4.0);

    let rMax = 0.8;


    
    for(let i=0; i<SHAPES.length; i++) {
        

        let shape = SHAPES[i];

        let speed = shape.speed;
        let xC = shape.xC - 0.001 + getRandomFloat(0.0007,0.001)*speed*rms*4.0;
        let yC = shape.yC + getRandomFloat(0.0007,0.001)*speed;
        let rad = shape.rad + 0.001 + getRandomFloat(0.001,0.01)*rms*4.0;
        // let aspect = shape.aspect + randomSign() * val*getRandomFloat(0.005,0.01);
        let age = shape.age + 0.01;
        let aspect = 1.0 + rms*0.1;
        let alpha = shape.alpha * 0.96;

        let xCPix = xC*WIDTH_VIZ;
        let yCPix = yC*HEIGHT_VIZ;

        //// when the radius exceeds this value reset the shape
        if(age>1.0 || rad>0.2) {
            age = 0.0;
            rad = 0.0;
            alpha = 1.0;
            xC = getRandomFloat(-0.2,1.0);
            yC = getRandomFloat(-0.2,1.0);
            aspect = 1.0;
        }

        let rPixX = val*WIDTH_VIZ*rad*rMax;

        let rPixY = rPixX*aspect;

        // console.log("rPix",rPix)


        //// draw circle
        ctx.fillStyle =   "hsl(200, 50%, 60%, " + alpha + ")";
        ctx.strokeStyle = "hsl(200, 50%, 60%, " + alpha + ")";
        ctx.lineWidth = getRandomFloat(1.0,4.0);

        //// background
        // ctx.beginPath();
        // ctx.rect(0, 0, WIDTH, HEIGHT);
        // ctx.fill();

        ctx.beginPath();
        ctx.ellipse(xCPix, yCPix, rPixX, rPixY, 0, 0, twoPI);
        // ctx.stroke();
        ctx.fill();

        shape.rad = rad;
        shape.age = age;
        shape.alpha = alpha;
        shape.xC = xC;
        shape.yC = yC;
        // shape.aspect = aspect;
        SHAPES[i] = shape; // update shape

    }


}






