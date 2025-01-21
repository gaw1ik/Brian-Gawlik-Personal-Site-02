


function drawVisualizer() {

    let canvas = canvasViz01;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var rms;

    try {
        rms = device.parametersById.get("master_rms").value;
    } catch (error) {
        rms = 0;
    }

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    // drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);

    let rmsScaled = rms/0.5;

    var mag = 0.2*rmsScaled;

    var y1 = 0.1;

    let [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    var alpha = 255;
    var lw = 0.001;

    randFloats = [];

    let nSegs =  128;
    let scale1 = 1;
    let scale2 = 0.2;

    var y1 = 0.1;

    var path = [];

    for(let i=0; i<nSegs; i++) {

        let randFloat1 = getRandomFloat()*scale1;
        let randFloat2 = randFloat1 + getRandomFloat()*scale2;

        let t = i/(nSegs-1) + getRandomFloat(0,0.001);

        path.push([-artboardWo2+artboardWo2*2*t,y1+mag*randFloat1])
        path.push([-artboardWo2+artboardWo2*2*t,y1+mag*randFloat2])
        path.push([-artboardWo2+artboardWo2*2*t,y1+mag*randFloat1])

    }

    drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);

    var y1 = 0.9;

    var path = [];

    for(let i=0; i<nSegs; i++) {

        let randFloat1 = getRandomFloat()*scale1;
        let randFloat2 = randFloat1 + getRandomFloat()*scale2;
        
        let t = i/(nSegs-1) + getRandomFloat(0,0.001);

        path.push([-artboardWo2+artboardWo2*2*t,y1+mag*randFloat1])
        path.push([-artboardWo2+artboardWo2*2*t,y1+mag*randFloat2])
        path.push([-artboardWo2+artboardWo2*2*t,y1+mag*randFloat1])

    }

    drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);


    
}

function drawVisualizer02() {

    let canvas = canvasViz01;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    var alpha = 255;
    var lw = 0;
    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, lw, hueBG, satBG, litBG, alpha, 0);

    var rms;

    try {
        rms = device.parametersById.get("master_rms").value;
    } catch (error) {
        rms = 0;
    }

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    let rmsScaled = rms*0.0;

    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);

    ctx.lineCap = "round";

    var shape = VIZ_SHAPES[0];
    // shape.HSL = s
    var nextShape = calc_segwave02(shape,rmsScaled);
    VIZ_SHAPES[0] = nextShape;
    let path1 = nextShape.path;


    var shape = VIZ_SHAPES[1];
    var nextShape = calc_segwave02(shape,rmsScaled);
    let path2 = nextShape.path;

    let pathFull = path1.concat(path2.reverse());


    // var shape = VIZ_SHAPES[1];
    // shape.HSL = [hueWave2,satWave2,litWave2];
    // var nextShape = draw_segwave(ctx,shape,rmsScaled);
    // VIZ_SHAPES[1] = nextShape;

    var lw = shape.lw;
    // var [hue,sat,lit] = [hueWave1,satWave1,litWave1];
    var [hue,sat,lit] = [hueWave2,satWave2,litWave2];
    var alpha = shape.alpha;

    drawPath(ctx, pathFull, lw, hue, sat, lit, alpha, 0, 0);

    
}


function drawVisualizer03() {

    let canvas = canvasViz01;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;




    // var [hue,sat,lit] = [150,30,20];
    var alpha = 255;
    var lw = 0;
    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, lw, hueBG, satBG, litBG, alpha, 0);

    var rms;

    try {
        rms = device.parametersById.get("master_rms").value;
    } catch (error) {
        rms = 0;
    }

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    let rmsScaled = rms*0.0;
    // let rmsScaled = 1;

    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);

    ctx.lineCap = "round";

    // for(let i=0;i<N_VIZ_SHAPES;i++) {

    //     let shape = VIZ_SHAPES[i];

    //     let nextShape = draw_segwave(ctx,shape,rmsScaled);

    //     VIZ_SHAPES[i] = nextShape;

    //     // console.log(phaseOffset);

    // }

    var shape = VIZ_SHAPES[0];
    shape.HSL = [hueWave1,satWave1,litWave1];
    var nextShape = draw_segwave(ctx,shape,rmsScaled);
    VIZ_SHAPES[0] = nextShape;

    var shape = VIZ_SHAPES[1];
    shape.HSL = [hueWave2,satWave2,litWave2];
    var nextShape = draw_segwave(ctx,shape,rmsScaled);
    VIZ_SHAPES[1] = nextShape;
    
}

function calc_segwave02(shape,rmsScaled) {

    let amplitude2 = 0.0001;
    let phase2 = shape.phase2 + getRandomFloat(0.001,0.003)*PI;

    let phaseOffset = shape.phaseOffset;
    let nSegs = shape.nSegs;
    let Y0 = shape.Y0;
    let amplitude = shape.amplitude + amplitude2*Math.sin(phase2);
    let xSpan = shape.xSpan;
    let speed = shape.speed;

    let period = PI*3;

    var theta1 = phaseOffset;
    let x1 = -artboardWo2;
    let y1 = Y0 + amplitude*Math.sin(theta1) + rmsScaled;
    let path = [];
    path.push([x1,y1]);


    for(let i=0;i<nSegs;i++) {

        // let t1 = i/(nSegs-1);

        // var theta1 = phaseOffset + t1 * period;
        // let x1 = -artboardWo2 + t1*(xSpan);
        // let y1 = Y0 + amplitude*Math.sin(theta1) + rmsScaled;

        var theta2 = phaseOffset + (i+1)/(nSegs-1) * period;

        let t2 = (i+1)/(nSegs-1);

        let x = -artboardWo2 + t2*(xSpan);
        let y = Y0 + amplitude*Math.sin(theta2) + rmsScaled;

        // let path = [[x1,y1],[x2,y2]];

        path.push([x,y]);


    }


    shape.phaseOffset = phaseOffset + speed + rmsScaled/8;
    shape.path = path;
    shape.amplitude = amplitude;
    shape.phase2 = phase2;

    return shape;
}


function draw_segwave(ctx,shape,rmsScaled) {

    let lw = shape.lw;
    let [hue,sat,lit] = shape.HSL;
    let alpha = shape.alpha;
    let phaseOffset = shape.phaseOffset;
    let nSegs = shape.nSegs;
    let Y0 = shape.Y0;
    let amplitude = shape.amplitude;
    let xSpan = shape.xSpan;
    let speed = shape.speed;

    let period = PI*3;

    for(let i=0;i<nSegs;i++) {

        let t1 = i/(nSegs-1);

        var theta1 = phaseOffset + t1 * period;
        let x1 = -artboardWo2 + t1*(xSpan);
        let y1 = Y0 + amplitude*Math.sin(theta1) + rmsScaled;

        var theta2 = phaseOffset + (i+1)/(nSegs-1) * period;

        let t2 = (i+1)/(nSegs-1);
        let x2 = -artboardWo2 + t2*(xSpan);
        let y2 = Y0 + amplitude*Math.sin(theta2) + rmsScaled;

        let path = [[x1,y1],[x2,y2]];

        drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);

    }

    shape.phaseOffset = phaseOffset + speed + rmsScaled/8;


    return shape;
}


function drawVisualizer02() {

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






