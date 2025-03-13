




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

    } catch(error) {}

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    drawRect(ctx,-artboardWo2,0,artboardWo2*2,1, 0, hueBG2, satBG2, litBG2, alphaBG2, 0);
    
    
    let [hue,sat,lit,alpha] = [hueUI1,satUI1,litUI1, alphaUI1];

    var lw = 0.006;
    var shape = VIZ_SHAPES[0];
    var rad = 0.002;
    var nSegs = 128;
    var x0 = -0.6*artboardWo2;
    var rmsScaled = mp_rms*3;
    var freq = mp_freq;
    draw_string(nSegs,shape,x0,lw,rad,rmsScaled,hue,sat,lit,alpha,freq);



    var lw = 0.003*artboardWo2;
    var shape = VIZ_SHAPES[0];
    // var nSegs = 32;

    for(let i=0; i<8; i++) {
        var x0 = 0.0 + 0.1*artboardWo2*i;
        // var freq = FREQ2[i];
        var freq = pp_freq_v[i];
        var rmsScaled = pp_rms_v[i]*2;

        draw_string(nSegs,shape,x0,lw,rad,rmsScaled,hue,sat,lit,alpha,freq);
    }




}

TEMP = 1;

// rad = 0;


function draw_string(nSegs,shape,x0,lw,rad,rmsScaled,hue,sat,lit,alpha,freq) {

    // let amp = 0.05*rmsScaled**0.5;
    let amp = 0.3*rmsScaled;


    let path = [];

    let phaseOffset = shape.phaseOffset;

    for(let i=0;i<nSegs;i++) {
        
        let t = i/(nSegs-1);

        let theta = n2r(t,0,twoPI*8) + phaseOffset;

        let y = n2r(t,0,1);
        let xDelta = Math.sin(theta) * amp;
        var x = x0 + xDelta;
        path.push([x,y]);

        // let rad = 0.002;
        drawCircle(ctx, x, y, rad, lw, hue, sat, lit, alpha, 0);

    }

    shape.phaseOffset = phaseOffset + rmsScaled*freq*8;

    drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);

}








