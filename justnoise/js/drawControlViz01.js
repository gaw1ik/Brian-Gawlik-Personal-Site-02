


function draw_controlViz(canvas,rms) {

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    MASTER_GAIN = 0.5;

    let rmsScaled = (rms)/(MASTER_GAIN+0.001);

    // console.log("rmsScaled",rmsScaled);


    let mag = 1.0*rmsScaled;

    // console.log("mag",mag);


    // let shape = SHAPES[0];

    // let [xC1,yC1] = [shape.xC1+randomSign()*mag, shape.yC1+randomSign()*mag];
    // let [xC2,yC2] = [shape.xC2+randomSign()*mag, shape.yC2+randomSign()*mag];

    // path = [[-artboardWo2,rmsScaled],[artboardWo2,rmsScaled]];

    path = [ [-artboardWo2,rmsScaled], [artboardWo2,rmsScaled], [artboardWo2,0], [-artboardWo2,0], [-artboardWo2,rmsScaled]];


    // bezCurve = [];
    // bezCurve[0] = [[-artboardWo2-0.6,0.0],[xC1,yC1],[xC2,yC2],[artboardWo2+0.6,1.0]];
    
    // console.log([[-artboardWo2-0.6,0.0],[xC1,yC1],[xC2,yC2],[artboardWo2+0.6,1.0]]);
    [hue,sat,lit] = [150,30,6];
    alpha = 255;
    lw = 0.02;
    drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0)


    // shape.xC1 = xC1;
    // shape.yC1 = yC1;
    // shape.xC2 = xC1;
    // shape.yC2 = yC2;
    


}


function draw_background_controlViz() {

    var rms;
    var gain;
    var LPF;

    // try {
    rms = device.parametersById.get("background_rms").value;

    // } catch(error) {
    //     rms = 0.5;
    // }

    gain = PARAMS.background_gain;
    LPF = PARAMS.background_LPF;


    let canvas = canvas_background_controlViz;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // try {
    //     rms = device.parametersById.get("master_rms").value;
    // } catch (error) {
    //     rms = 0;
    // }

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    // drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueBG, satBG, litBG, 255, 0);

    let rmsScaled = rms*1;

    let [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    var alpha = 255;
    var lw = 0.01;

    var path = [];
    randFloats = [];
    let nSegs =  32;
    let scale1 = 0.6*gain;
    let scale2 = 0.4*LPF;
    var y1 = 0.5;

    rmsScaled = 0.2;

    for(let i=0; i<nSegs; i++) {

        let randFloat1 = getRandomFloat()*scale1;
        let randFloat2 = randFloat1 + getRandomFloat()*scale2;

        let t = i/(nSegs-1) + getRandomFloat(0,0.001);

        path.push([-artboardWo2+artboardWo2*2*t,y1+rmsScaled*randFloat1])
        path.push([-artboardWo2+artboardWo2*2*t,y1+rmsScaled*randFloat2])
        path.push([-artboardWo2+artboardWo2*2*t,y1+rmsScaled*randFloat1])

    }

    drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);
   
}


function draw_hiss_controlViz() {

    var rms;
    var gain;
    var hiss;
    var LPF;

    // try {
    rms = device.parametersById.get("background_rms").value;
    // } catch(error) {
    //     rms = 0.5;
    // }

    // gain = PARAMS.background_gain;
    hiss = PARAMS.hiss_gain;
    // LPF = PARAMS.background_LPF;


    let canvas = canvas_hiss_controlViz;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    // MASTER_GAIN = 0.5;s

    // drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);


    let rmsScaled = rms/0.5;

    var mag = hiss*0.2*rmsScaled;

    // let y1 = Math.tanh(gain + mag  + 0.01);

    let y_hiss = 0.5;

    // let path1 = [ [-artboardWo2,y_hiss], [artboardWo2,y_hiss] ];
    let path1 = [ 
        [-artboardWo2,y_hiss+mag*getRandomFloat()],
        [-artboardWo2/2,y_hiss+mag*getRandomFloat()],
        [0,y_hiss+mag*getRandomFloat()],
        [artboardWo2/2,y_hiss+mag*getRandomFloat()],
        [artboardWo2,y_hiss+mag*getRandomFloat()],
    ];

    let [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    var alpha = hiss*255;
    var lw = 0.01;
    drawPath(ctx, path1, lw, hue, sat, lit, alpha, 1, 0);

    // var [hue,sat,lit] = [150,30,6];
    // var alpha = alphaUI1;
    
    // var mag = LPF*0.2*rmsScaled;

    // var x = -artboardWo2;
    // var y = 0;
    // var width = artboardWo2*2;
    // var height = y1;
    // let path2 = [ 
    //     [-artboardWo2,y_hiss+mag*getRandomFloat()],
    //     [-artboardWo2/2,y_hiss+mag*getRandomFloat()],
    //     [0,y1+mag*getRandomFloat()],
    //     [artboardWo2/2,y_hiss+mag*getRandomFloat()],
    //     [artboardWo2,y_hiss+mag*getRandomFloat()],
    //     // [artboardWo2,0],
    //     // [-artboardWo2,0]
    // ];


    // console.log(path2)

    // drawRect(ctx, x, y, width, height, lw, hue, sat, lit, alpha, 0);
    // drawPath(ctx, path2, lw, hue, sat, lit, alpha, 1, 0);

;
}



function draw_wash_controlViz() {

    // console.log("draw_wash_controlViz")

    // let rms = device.parametersById.get("wash_rms").value;
    // // let t1 = device.parametersById.get("wash_t1").value;
    // let t2 = device.parametersById.get("wash_t2").value;
    // let gain = PARAMS.wash_gain;

    // let t1 = wash_timer/wash_intervalTimeMin;

    // console.log("t1",t1);

    let canvas = canvas_wash_controlViz;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    MASTER_GAIN = 0.5;

    // let rmsScaled = (rms)/(MASTER_GAIN+0.001);




    //drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);




    var [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    var alpha = 255;


    let lw = 0.01;
    // let rot = 0;
    // let xC_arc = 0;
    // let yC_arc = 0.3;
    // let radX_arc = artboardWo2; // *0.75
    // let radY_arc = 0.95*gain * (1-yC_arc);
    // let startAngle = -PI;
    // let endAngle = 0;

    let yMin = 0.0;
    let yMax = 0.6;
    let rad = 0.03;
    let xPeak = 0;
    // path = [[-artboardWo2,yMin],[xPeak,yMax],[artboardWo2,yMin]];
    // drawPath(ctx,path,lw, hue, sat, lit, alpha, 1, 0);
    bezCurve = [];
    bezCurve[0] = [[-artboardWo2,yMin],[-artboardWo2/2,0.8],[artboardWo2/2,0.8],[artboardWo2,yMin]];
    drawBezierCurve(ctx, bezCurve, lw, hue, sat, lit, 150, 1, 0);
    // drawArc(ctx, xC_arc, yC_arc, radX_arc, radY_arc, rot, startAngle, endAngle, lw, hue, sat, lit, alpha, 1);

    // let tAtt = wash_timer/wash_attackTime;
    // let tDec = (wash_timer-wash_attackTime)/wash_decayTime;

    // let t = wash_timer/wash_envelopeTime;
    // let [xC,yC] = bez4(t,[-artboardWo2,yMin],[-artboardWo2/2,0.8],[artboardWo2/2,0.8],[artboardWo2,yMin]);
    // drawCircle(ctx, xC, yC, rad, lw, hue, sat, lit, alpha, 1);
    let tAtt = wash_timer/wash_attackTime;
    let tDec = (wash_timer-wash_attackTime)/wash_decayTime;

    if(tAtt<1) {
        let [xC,yC] = bez4(tAtt/2,[-artboardWo2,yMin],[-artboardWo2/2,0.8],[artboardWo2/2,0.8],[artboardWo2,yMin]);
        drawCircle(ctx, xC, yC, rad, lw, hue, sat, lit, alpha, 0);
    } else {
        let [xC,yC] = bez4(tDec+0.5,[-artboardWo2,yMin],[-artboardWo2/2,0.8],[artboardWo2/2,0.8],[artboardWo2,yMin]);
        drawCircle(ctx, xC, yC, rad, lw, hue, sat, lit, alpha, 0);
    }


    wash_timer = wash_timer + 34;
    


}


function draw_rush_controlViz() {

    let canvas = canvas_rush_controlViz;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    // let rmsScaled = (rms)/(0.5);

    // drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);



    // let y1 = gain + rmsScaled*BPF/20000*4;
    // let y2 = gain + rmsScaled*Q;


    let [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    let alpha = alphaUI1;
    let lw = 0.01;
    // let shape = RUSH_SHAPES[0];
    // let rad = 0.05;
    // let nSegs = 12;

    // let yMax = 0.8;

    let yMin = 0.0;
    let yMax = 0.6;
    let rad = 0.025;
    let xPeak = -0.0;
    //path = [[-artboardWo2,yMin],[xPeak,yMax],[artboardWo2,yMin]];
    // drawPath(ctx,path,lw, hue, sat, lit, alpha, 1, 0);

    bezCurve = [];
    bezCurve[0] = [[-artboardWo2,yMin],[-artboardWo2/16,0.8],[artboardWo2/16,0.8],[artboardWo2,yMin]];
    drawBezierCurve(ctx, bezCurve, lw, hue, sat, lit, 150, 1, 0);

    for(let i=0;i<8;i++) {

        // let t = wash_timer/wash_envelopeTime;


        let tAtt = rush_timer[i]/rush_attackTime[i];
        let tDec = (rush_timer[i]-rush_attackTime[i])/rush_decayTime[i];

        if(tAtt<1) {

            // let xC = -artboardWo2 + tAtt*(artboardWo2);
            // let yC = tAtt*yMax;
    
            let [xC,yC] = bez4(tAtt/2,[-artboardWo2,yMin],[-artboardWo2/2,0.8],[artboardWo2/2,0.8],[artboardWo2,yMin]);
            drawCircle(ctx, xC, yC, rad, lw, hue, sat, lit, alpha, 0);
        } else {
            // let xC = xPeak + tDec*(artboardWo2);
            // let yC = (1-tDec)*yMax;
    
            let [xC,yC] = bez4(tDec+0.5,[-artboardWo2,yMin],[-artboardWo2/2,0.8],[artboardWo2/2,0.8],[artboardWo2,yMin]);
            drawCircle(ctx, xC, yC, rad, lw, hue, sat, lit, alpha, 0);
        }



        rush_timer[i] = rush_timer[i] + 34;
    }




}




function draw_crackle_controlViz() {

    var rms;
    var gain;
    var LPF;

    // rms = 1;

    gain = PARAMS.crackle_gain;
    thresh = PARAMS.crackle_thresh;
    LPF = PARAMS.crackle_LPF;

    let canvas = canvas_crackle_controlViz;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    // let rmsScaled = rms*1;

    var [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    var alpha = 150;
    var lw = 0.02;

    var path = [[-artboardWo2,0.5],[artboardWo2,0.5]];
    drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);

    let maxHeight = 0.3*gain;

    // rmsScaled = 0.8;

    // let nShapes = Math.ceil(thresh*32);

    var lw = 0.005 + 0.02 * (1-LPF);

    let speed = 0.01;

    for(let i=0; i<N_CRACKLESHAPES; i++) {

        let shape = CRACKLE_SHAPES[i];
        // let age = shape.age;
        // let x = shape.x;
        // let y = shape.y;

        let on = shape.on;

        // var newShape = {};

        if(on==1) {

            var path = [];

            // let randFloat1 = getRandomFloat()*scale1;
            // let randFloat2 =  getRandomFloat()*scale2;
    
            // let t = getRandomFloat(0,1);
    
            // path.push([x,y1])
            // path.push([x,y1+rmsScaled*randFloat2])
            // path.push([-artboardWo2+artboardWo2*2*t,y1+rmsScaled*randFloat1])
    
            let height = shape.height;
            let x1 = shape.x1;
            let lw = shape.lw;

            // console.log("lw",lw)


            let y1 = 0.5;
            let x2 = x1;
            let y2 = y1+height;

            var path = [[x1,y1],[x2,y2]];

            // console.log("x1",x1)
            drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);
    
            // yC = getRandomFloat()
            // let AR = 1+LPF*7;
            // let radX = 0.01;
            // let radY = radX*AR;
            // let alpha = 150*gain;
    
            // drawEllipse(ctx, x,y,radX,radY, 0,lw, hue, sat, lit, alpha, 0);
            // drawEllipse(ctx, x,y,radY,radX, 0,lw, hue, sat, lit, alpha, 0);

            if(x1<-artboardWo2) {
                // newShape.age = age + 1;
                // newShape.x1 = 0;
                // shape.height = randomSign()*getRandomFloat(0.5,1)*maxHeight;
                shape.on = 0;
    
            } else {
                // newShape.age = 0;
                shape.x1 = x1 - speed - 0.10;
                // newShape.height = getRandomFloat(0.3,0.7);
                // newShape.on = 1;
            }

            // CRACKLE_SHAPES[i] = shape;

        } else {

            // newShape.age = 0;
            shape.x1 = artboardWo2 + getRandomFloat(0,0.1);
            shape.lw = vary(lw,50);
            shape.height = randomSign()*getRandomFloat(0.1,1)*maxHeight;
            shape.on = makeChoice(5);
        }

        CRACKLE_SHAPES[i] = shape;


    }

   
}

