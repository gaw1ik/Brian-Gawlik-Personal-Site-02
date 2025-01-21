


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
    var hiss;
    var LPF;

    // try {
    rms = device.parametersById.get("background_rms").value;
    // } catch(error) {
    //     rms = 0.5;
    // }

    gain = PARAMS.background_gain;
    // hiss = PARAMS.hiss_gain;
    LPF = PARAMS.background_LPF;


    let canvas = canvas_background_controlViz;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    // MASTER_GAIN = 0.5;s

    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);


    let rmsScaled = rms/0.5;

    var mag = 0.2*rmsScaled;

    let y1 = Math.tanh(gain + mag  + 0.01);

    // let y_hiss = 0.8 - mag*0.2;

    // let path1 = [ [-artboardWo2,y_hiss], [artboardWo2,y_hiss] ];
    // let path1 = [ 
    //     [-artboardWo2,y_hiss+mag*getRandomFloat()],
    //     [-artboardWo2/2,y_hiss+mag*getRandomFloat()],
    //     [0,y_hiss+mag*getRandomFloat()],
    //     [artboardWo2/2,y_hiss+mag*getRandomFloat()],
    //     [artboardWo2,y_hiss+mag*getRandomFloat()],
    // ];

    let [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    var alpha = hiss*255;
    var lw = 0.01;
    // drawPath(ctx, path1, lw, hue, sat, lit, alpha, 1, 0);

    // var alpha = alphaUI1;
    
    // var mag = LPF*0.2*rmsScaled;

    // var x = -artboardWo2;
    // var y = 0;
    // var width = artboardWo2*2;
    // var height = y1;
    let path2 = [ 
        [-artboardWo2,y1+mag*getRandomFloat()],
        [-artboardWo2/2,y1+mag*getRandomFloat()],
        [0,y1+mag*getRandomFloat()],
        [artboardWo2/2,y1+mag*getRandomFloat()],
        [artboardWo2,y1+mag*getRandomFloat()],
        // [artboardWo2,0],
        // [-artboardWo2,0]
    ];

    drawPath(ctx, path2, lw, hue, sat, lit, alpha, 1, 0);

;
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

    let rms = device.parametersById.get("wash_rms").value;
    let t1 = device.parametersById.get("wash_t1").value;
    let t2 = device.parametersById.get("wash_t2").value;
    let gain = PARAMS.wash_gain;

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

    let rmsScaled = (rms)/(MASTER_GAIN+0.001);

    // console.log("rmsScaled",rmsScaled);



    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);


    let mag = 1.0*rmsScaled;

    // console.log("mag",mag);


    // let shape = SHAPES[0];

    // let [xC1,yC1] = [shape.xC1+randomSign()*mag, shape.yC1+randomSign()*mag];
    // let [xC2,yC2] = [shape.xC2+randomSign()*mag, shape.yC2+randomSign()*mag];

    // path = [[-artboardWo2,rmsScaled],[artboardWo2,rmsScaled]];

    // let path = [ [-artboardWo2,0], [0,rmsScaled], [artboardWo2,0] ];
    var [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    var alpha = alphaUI1;

    // drawRect(ctx, -artboardWo2+0.05, 0, artboardWo2*1.9, 0.01, 0, hue, sat, lit, alpha, 0);

    // bezCurve = [];
    // bezCurve[0] = [[-artboardWo2-0.6,0.0],[xC1,yC1],[xC2,yC2],[artboardWo2+0.6,1.0]];
    
    // console.log([[-artboardWo2-0.6,0.0],[xC1,yC1],[xC2,yC2],[artboardWo2+0.6,1.0]]);
    let lw = 0.01;
    let rot = 0;

    let xC_arc = 0;
    let yC_arc = 0.01;
    let radX_arc = artboardWo2; // *0.75
    let radY_arc = 0.95*gain;
    // drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);
    drawEllipse(ctx, xC_arc, yC_arc, radX_arc, radY_arc, rot, lw, hue, sat, lit, alpha, 1);

    var [hue,sat,lit] = [hueUI1,satUI1,litUI1/2];
    var alpha = alphaUI1;
    let radX_dot = 0.02;
    let radY_dot = radX_dot;
    let L_dot = 0.05;
    lw = 0.02;
    if(t1!=0) {
        // console.log("t",t1)
        let theta1 = -PI-PIo16 + t1*(PI+PIo8);
        let theta2 = theta1 + PIo16;
        let xC_dot = xC_arc + radX_arc*Math.cos(theta1); 
        let yC_dot = yC_arc + radY_arc*Math.sin(theta1); 
        drawArc(ctx, xC_arc, yC_arc, radX_arc, radY_arc, rot, theta1, theta2, lw, hue, sat, lit, alpha, 1);

        // drawEllipse(ctx, xC_dot, yC_dot, radX_dot, radY_dot, rot, lw, hue, sat, lit, alpha, 0);
    } else {
        // console.log("t2",t2)
        // let theta = -PI - t*PI;
        let xC_dot1 = radX_arc + L_dot - t2*(radX_arc+L_dot)*2; 
        let yC_dot = 0; 
        let xC_dot2 = xC_dot1 - L_dot;
        let path = [[xC_dot1,yC_dot],[xC_dot2,yC_dot]];
        drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);
        // drawEllipse(ctx, xC_dot, yC_dot, radX_dot, radY_dot, rot, lw, hue, sat, lit, alpha, 0);
    }



    // shape.xC1 = xC1;
    // shape.yC1 = yC1;
    // shape.xC2 = xC1;
    // shape.yC2 = yC2;
    


}


function draw_rush_controlViz() {

    let rms = device.parametersById.get("rush_rms").value;
    // let gain = device.parametersById.get("rush_gain").value;
    let Q = device.parametersById.get("rush_Q").value;
    let BPF = device.parametersById.get("rush_BPF").value;
    let gain = PARAMS.rush_gain;


    // let gain = 0.5;


    let canvas = canvas_rush_controlViz;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    let rmsScaled = (rms)/(0.5);

    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);


    // let mag = 1.0*rmsScaled;

    let y1 = gain + rmsScaled*BPF/20000*4;
    let y2 = gain + rmsScaled*Q;


    // let [xC1,yC1] = [shape.xC1+randomSign()*mag, shape.yC1+randomSign()*mag];
    // let [xC2,yC2] = [shape.xC2+randomSign()*mag, shape.yC2+randomSign()*mag];

    // path = [[-artboardWo2,rmsScaled],[artboardWo2,rmsScaled]];

    // let path = [ [-artboardWo2,y1], [artboardWo2,y2] ];


    // bezCurve = [];
    // bezCurve[0] = [[-artboardWo2-0.6,0.0],[xC1,yC1],[xC2,yC2],[artboardWo2+0.6,1.0]];
    
    // console.log([[-artboardWo2-0.6,0.0],[xC1,yC1],[xC2,yC2],[artboardWo2+0.6,1.0]]);
    let [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    let alpha = alphaUI1;
    let lw = 0.01;
    // drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);
    let shape = RUSH_SHAPES[0];
    let rad = 0.02;
    let nSegs = 12;
    // let jigg = rmsScaled*randomSign();
    for(let i=0;i<12;i++) {
        let phaseOffset = shape.phaseOffset;
        var theta1 = phaseOffset + i/(nSegs-1) * twoPI;
        let t1 = i/(nSegs-1);
        let x1 = -artboardWo2 + t1*(2*artboardWo2);
        let y1 = 0.3 + Math.sin(theta1)*0.9*rmsScaled;
        var theta2 = phaseOffset + (i+1)/(nSegs-1) * twoPI;
        let t2 = (i+1)/(nSegs-1);
        let x2 = -artboardWo2 + t2*(2*artboardWo2);
        let y2 = 0.3 + Math.sin(theta2)*0.9*rmsScaled;
        // drawCircle(ctx, x, y, rad, lw, hue, sat, lit, alpha, 0);

        let path = [[x1,y1],[x2,y2]];
        drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);

        shape.phaseOffset = phaseOffset + PI/2000 + rmsScaled/8;
        // RUSH_SHAPES[i] = (newShape);
    }



    // var x = -artboardWo2;
    // var y = 0;
    // var width = artboardWo2;
    // var height = y1 + 0.01;
    // drawRect(ctx, x, y, width, height, lw, hue, sat, lit, alpha, 0);

    // var x = 0;
    // var y = 0;
    // var width = artboardWo2;
    // var height = y2 + 0.01;
    // drawRect(ctx, x, y, width, height, lw, hue, sat, lit, alpha, 0);

}

function draw_insects_controlViz() {

    let rms = device.parametersById.get("insects_rms").value;
    // let gain = device.parametersById.get("birds_gain").value;
    // let gain = PARAMS.birds_gain;

    let canvas = canvas_insects_controlViz;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);



    // let rmsScaled = rms*7;

    // let mag = 1.0*rmsScaled;

    // let y1 = rmsScaled;
    // let y2 = gain + mag*Q;



    let [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    let alpha = alphaUI1;
    let lw = 0;



    for(let i=0; i<8; i++) {

        let shape = INSECTS_SHAPES[i];

        var xC = shape.xC + randomSign()*0.01;
        var yC = shape.yC + randomSign()*0.01;
        var rad = shape.rad + rms*0.35;

        drawCircle(ctx, xC, yC, rad, lw, hue, sat, lit, alpha, 0);



        var newShape = {}

        if(Math.abs(xC)>artboardWo2+0.03 || yC<-0.03 || yC>1.03) {
            newShape = {
                xC:getRandomFloat(-1,1),
                yC:getRandomFloat(),
                rad:0.01,
            }
        } else {
            newShape.xC = xC;
            newShape.yC = yC;
            newShape.rad = 0.01;
        }

        INSECTS_SHAPES[i] = newShape;
    }

    // var x = 0;
    // var y = 0;
    // var width = artboardWo2;
    // var height = y2 + 0.01;
    // drawRect(ctx, x, y, width, height, lw, hue, sat, lit, alpha, 0);

}

function draw_birds_controlViz() {

    let rms = device.parametersById.get("birds_rms").value;
    // let gain = device.parametersById.get("birds_gain").value;
    // let gain = PARAMS.birds_gain;

    let canvas = canvas_birds_controlViz;
    let ctx = canvas.getContext("2d");
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;


    let rmsScaled = rms*7;

    // drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueUI2, satUI2, litUI2, alphaUI2, 0);


    // let mag = 1.0*rmsScaled;

    let y1 = rmsScaled;
    // let y2 = gain + mag*Q;



    let [hue,sat,lit] = [hueUI1,satUI1,litUI1];
    let alpha = alphaUI1;
    let lw = 0.02;

    var x = getRandomFloat()*artboardWo2*randomSign();
    var y = 0;
    var width = 0.01;
    var height = y1 + 0.01;
    drawRect(ctx, x, y, width, height, lw, hue, sat, lit, alpha, 0);

    // var x = 0;
    // var y = 0;
    // var width = artboardWo2;
    // var height = y2 + 0.01;
    // drawRect(ctx, x, y, width, height, lw, hue, sat, lit, alpha, 0);

}