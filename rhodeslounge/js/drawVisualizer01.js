








function draw_visualizer() {

    let canvas = canvasViz01;
    let canvasW = canvas.width;
    let canvasH = canvas.height;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasW, canvasH);

    var mp_rms = 0;
    var mp_freq = 0;

    var pp_freq_v = [0,0,0,0,0,0,0,0];
    var pp_rms_v =  [0,0,0,0,0,0,0,0];

    try{

        mp_freq = device.parametersById.get("monoPluck01_freq1").value;
        mp_rms = device.parametersById.get("monoPluck01_rms").value;

        pp_freq_v[0] = device.parametersById.get("p_obj-105/monoPluck01_freq1_v1").value;
        pp_freq_v[1] = device.parametersById.get("p_obj-105/monoPluck01_freq1_v1").value;
        pp_freq_v[2] = device.parametersById.get("p_obj-105/monoPluck01_freq1_v2").value;
        pp_freq_v[3] = device.parametersById.get("p_obj-105/monoPluck01_freq1_v3").value;
        pp_freq_v[4] = device.parametersById.get("p_obj-105/monoPluck01_freq1_v4").value;
        pp_freq_v[5] = device.parametersById.get("p_obj-105/monoPluck01_freq1_v5").value;
        pp_freq_v[6] = device.parametersById.get("p_obj-105/monoPluck01_freq1_v6").value;
        pp_freq_v[7] = device.parametersById.get("p_obj-105/monoPluck01_freq1_v7").value;

        pp_rms_v[0] = device.parametersById.get("p_obj-105/monoPluck01_rms_v8").value;
        pp_rms_v[1] = device.parametersById.get("p_obj-105/monoPluck01_rms_v1").value;
        pp_rms_v[2] = device.parametersById.get("p_obj-105/monoPluck01_rms_v2").value;
        pp_rms_v[3] = device.parametersById.get("p_obj-105/monoPluck01_rms_v3").value;
        pp_rms_v[4] = device.parametersById.get("p_obj-105/monoPluck01_rms_v4").value;
        pp_rms_v[5] = device.parametersById.get("p_obj-105/monoPluck01_rms_v5").value;
        pp_rms_v[6] = device.parametersById.get("p_obj-105/monoPluck01_rms_v6").value;
        pp_rms_v[7] = device.parametersById.get("p_obj-105/monoPluck01_rms_v7").value;

    } catch(error) {

        // rms = 0;
        // freq = 0;

        // freq_v1 = 0;
        // freq_v2 = 0;
        // freq_v3 = 0;
        // freq_v4 = 0;
        // freq_v5 = 0;
        // freq_v6 = 0;
        // freq_v7 = 0;
        // freq_v8 = 0;

        // rms_v1 = 0;
        // rms_v2 = 0;
        // rms_v3 = 0;
        // rms_v4 = 0;
        // rms_v5 = 0;
        // rms_v6 = 0;
        // rms_v7 = 0;
        // rms_v8 = 0;
    }

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    // var rmsScaled = 0.000001 + (rms)/(0.5);

    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueBG2, satBG2, litBG2, alphaBG2, 0);

    // let y1 = gain + rmsScaled*BPF/20000*4;
    // let y2 = gain + rmsScaled*Q;
    
    
    let [hue,sat,lit,alpha] = [hueUI1,satUI1,litUI1, alphaUI1];
    // let alpha = alphaUI1;

    // var [hue,sat,lit] = [0,0,100];
    // var alpha = 100;

    var lw = 0.002;
    var shape = VIZ_SHAPES[0];
    // rad = 0.002;
    var nSegs = 128;
    var x0 = -0.7;
    var rmsScaled = mp_rms*3;
    var freq = mp_freq;
    draw_string(nSegs,shape,x0,lw,rad,rmsScaled,hue,sat,lit,alpha,freq);



    var lw = 0.001;
    var shape = VIZ_SHAPES[0];
    // rad = 0.002;
    var nSegs = 32;

    for(let i=0; i<8; i++) {
        var x0 = 0.6 + 0.03*i;
        // var freq = FREQ2[i];
        var freq = pp_freq_v[i];
        var rmsScaled = pp_rms_v[i]*0.5;

        draw_string(nSegs,shape,x0,lw,rad,rmsScaled,hue,sat,lit,alpha,freq);
    }




}

TEMP = 1;

rad = 0;


function draw_string(nSegs,shape,x0,lw,rad,rmsScaled,hue,sat,lit,alpha,freq) {

    let amp = 0.1*rmsScaled;

    // let artbw = artboardWo2*2;

    for(let i=0;i<nSegs;i++) {

        let phaseOffset = shape.phaseOffset;

        var theta1 = phaseOffset + i/(nSegs-1) * twoPI;
        let t1 = i/(nSegs-1);
        let y1 = t1 + Math.sin(theta1) * amp;
        let x1 = x0*artboardWo2 + Math.cos(theta1) * amp;

        var theta2 = phaseOffset + (i+1)/(nSegs-1) * twoPI;
        let t2 = (i+1)/(nSegs-1);
        let y2 = t2 + Math.sin(theta2) * amp;
        let x2 = x0*artboardWo2 + Math.cos(theta2) * amp * TEMP;

        let path = [[x1,y1],[x2,y2]];
        drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);

        drawCircle(ctx, x2, y2, rad, lw, hue, sat, lit, alpha, 1);
        // shape.phaseOffset = phaseOffset + PI/2000 + rmsScaled*freq/8;

        shape.phaseOffset = phaseOffset + rmsScaled*freq/8;

    }

    // for(let i=0;i<nSegs;i++) {

    //     let phaseOffset = shape.phaseOffset;
    //     var theta1 = phaseOffset + i/(nSegs-1) * twoPI;
    //     let t1 = i/(nSegs-1);
    //     let x1 = -artboardWo2 + t1*(2*artboardWo2);
    //     let y1 = y0 + Math.sin(theta1)*amp*rmsScaled;
    //     var theta2 = phaseOffset + (i+1)/(nSegs-1) * twoPI;
    //     let t2 = (i+1)/(nSegs-1);
    //     let x2 = -artboardWo2 + t2*(2*artboardWo2);
    //     let y2 = y0 + Math.sin(theta2)*amp*rmsScaled;

    //     let path = [[x1,y1],[x2,y2]];
    //     drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);

    //     // drawCircle(ctx, x2, y2, rad, lw, hue, sat, lit, alpha, 1);

    //     shape.phaseOffset = phaseOffset + PI/2000 + rmsScaled/freq;

    // }

}



function drawVisualizer01() {

    let canvas = canvasViz01;
    let canvasW = canvas.width;
    let canvasH = canvas.height;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasW, canvasH);

    var rms;
    try{
        rms = device.parametersById.get("master_rms").value;
    } catch(error) {
        rms = 0.01;
    }


    let val = Math.tanh((rms+0.4)*4.0);


    let rMax = 0.8;

    
    for(let i=0; i<SHAPES.length; i++) {

        let shape = SHAPES[i];
        let on = shape.on;

        if(on==0) {
            shape.on = makeChoice(10);
            SHAPES[i] = shape; // update shape
            return;
        }

        let speed = shape.speed * 0.3;
        let xC = shape.xC - 0.0001 + getRandomFloat(0.0007,0.001)*speed*rms*2.0;
        let yC = shape.yC + getRandomFloat(0.0007,0.001)*speed*0.50;
        let rad = shape.rad + 0.0001 + getRandomFloat(0.001,0.01)*rms*1.0;
        // let aspect = shape.aspect + randomSign() * val*getRandomFloat(0.005,0.01);
        let age = shape.age + 0.003;
        let aspect = 1.0 + rms*0.1;
        let alpha = shape.alpha * 0.97;

        let xCPix = xC*canvasW;
        let yCPix = yC*canvasH;

        //// when the radius exceeds this value reset the shape
        if(age>1.0 || rad>0.14) {
            age = 0.0;
            rad = 0.0;
            alpha = 1.0;
            xC = getRandomFloat(-0.2,1.0);
            yC = getRandomFloat(-0.2,1.0);
            aspect = 1.0;
        }

        let rPixX = val*canvasW*rad*rMax;

        let rPixY = rPixX*aspect;

        // console.log("rPix",rPix)

        //// draw circle
        ctx.fillStyle =   "hsl(200, 50%, 60%, " + alpha + ")";
        ctx.strokeStyle = "hsl(200, 50%, 60%, " + alpha + ")";
        ctx.lineWidth = getRandomFloat(1.0,4.0);

        ctx.beginPath();
        ctx.ellipse(xCPix, yCPix, rPixX, rPixY, 0, 0, twoPI);
        // ctx.stroke();
        ctx.fill();

        shape.rad = rad;
        shape.age = age;
        shape.alpha = alpha;
        shape.xC = xC;
        shape.yC = yC;
        SHAPES[i] = shape; // update shape

    }





}







