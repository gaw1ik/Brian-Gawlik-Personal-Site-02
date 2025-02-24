
function draw_canvasSetTheme() {

    let canvas = canvas_setTheme;
    let canvasW = canvas.width;
    let canvasH = canvas.height;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasW, canvasH);

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;

    var hue;
    var sat;
    var lit;
    var alpha;
    var hueLine;
    var satLine;
    var litLine;
    var alphaLine;

    let rad = 0.45;
    var lw = 0.01;


    if(themeName=='light') {
        // [hue,sat,lit,alpha] = [200,90,90,255];
        // drawCircle(ctx, 0, 0.5, rad, lw, hue, sat, lit, alpha, 0);
        [hueLine,satLine,litLine,alphaLine] = [200,90,0,255];
        drawSun(lw,hueLine,satLine,litLine,alphaLine)

    } else if (themeName=='dark') {
        // [hue,sat,lit,alpha] = [0,0,10,255];
        // drawCircle(ctx, 0, 0.5, rad, lw, hue, sat, lit, alpha, 0);
        [hueLine,satLine,litLine,alphaLine] = [200,90,100,255];
        drawMoon(lw,hueLine,satLine,litLine,alphaLine)

    } else {
        console.log('that was not a theme');
    }

}

function drawMoon(lw,hue,sat,lit,alpha) {

    let rot = 0;

    let [xC,yC] = [0.0,0.5];

    var startAngle = PIo2;
    var endAngle = 3*PIo2;

    var radX = 0.30;
    var radY = 0.30;

    drawArc(ctx, xC, yC, radX, radY, rot, startAngle, endAngle, lw, hue, sat, lit, alpha, 1);

    var radX = 0.10;
    // var radY = 0.20;

    drawArc(ctx, xC, yC, radX, radY, rot, startAngle, endAngle, lw, hue, sat, lit, alpha, 1);


}

function drawSun(lw,hue,sat,lit,alpha) {

    let path = [];

    let nPoints = 21;

    let r1 = 0.40;
    let r2 = r1*0.67;

    var x;
    var y;

    let [xC,yC] = [0,0.5];

    for(let i=0; i<nPoints; i++) {

        let t = i/(nPoints-1);
        let theta = t*twoPI;

        if(i%2==0) {
            x = xC + Math.cos(theta)*r1;
            y = yC + Math.sin(theta)*r1;
        } else {
            x = xC + Math.cos(theta)*r2;
            y = yC + Math.sin(theta)*r2;
        }

        path.push([x,y]);

    }

    drawPath(ctx, path, lw, hue, sat, lit, alpha, 1, 0);


}






function draw_onoff() {



    let rms = 1.0;


    // get context and clear for new drawing
    let canvas = canvas_onoff;
    let ctx = canvas.getContext("2d");
    let canvasW = canvas.width;
    let canvasH = canvas.height;
    ctx.clearRect(0, 0, canvasW, canvasH);




    //// draw circle
    ctx.fillStyle = "hsl(0, 50%, 50%, 0.1)";
    ctx.strokeStyle = "hsl(200, 0%, 60%, 1.0)";
    ctx.lineWidth = 2;

    artboardH = canvas.height;
    artboardW = canvas.width;
    artboardAR = artboardH/artboardW;
    artboardWo2 = (1/artboardAR)/2;
    xCenterOffset = artboardWo2;
    yCenterOffset = 0.0;




    // ctx.beginPath();
    // ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);
    // ctx.stroke();

    let rad2 = 0.3;

    let radGlow0 = 0.25;

    // let rPix = rad2;
    // let xC = canvasW/2;
    // let yC = canvasH/2;

    let rad = 0.2;
    let lw = 0.01;
    let path = [[0,0.5],[0,0.75]];




    if(PARAMS.onoff) { // if on
        for(let i=0;i<5;i++) {
            // let radGlow = radGlow0*1.2**i + rms/64000;
            // let alpha = 50/2**i;
            // drawCircle(ctx, 0, 0.5, radGlow, 0, 50,50,50,alpha, 0);

            let lwOn = lw*3;
            // let alpha = 150;
            drawArc(ctx, 0, 0.5, rad, rad, PI+PI/4, PI-PI/2, 0, lwOn, hue_onoff1,sat_onoff1,lit_onoff1,alpha_onoff1, 1);
            drawPath(ctx, path, lwOn, hue_onoff1,sat_onoff1,lit_onoff1,alpha_onoff1, 1, 0);

            // let lwOnGlow = lw*15;
            // let alpha = 10;
            // drawArc(ctx, 0, 0.5, rad, rad, PI+PI/4, PI-PI/2, 0, lwOnGlow, 30,100,50,alpha, 1);
            // drawPath(ctx, path, lwOnGlow, 30,100,50,alpha, 1, 0);

            drawCircle(ctx, 0, 0.5, rad2, lw, hue_onoff1,sat_onoff1,lit_onoff1,5, 0);

        }

        // document.getElementById("clickhereText").textContent = "";


    } else {

        // let alpha = 150;
        drawArc(ctx, 0, 0.5, rad, rad, PI+PI/4, PI-PI/2, 0, lw, hue_onoff0,sat_onoff0,lit_onoff0,alpha_onoff0, 1);
        drawPath(ctx, path, lw, hue_onoff0,sat_onoff0,lit_onoff0,alpha_onoff0, 1, 0) ;

        drawCircle(ctx, 0, 0.5, rad2, lw, 0,0,0,30, 0);
   
    
    }



    
    drawCircle(ctx, 0, 0.5, rad2, lw/2, 0,0,0,255, 1);


}
