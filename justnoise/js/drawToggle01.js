
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
        [hue,sat,lit,alpha] = [0,0,95,255];
        drawCircle(ctx, 0, 0.5, rad, lw, hue, sat, lit, alpha, 0);
        [hueLine,satLine,litLine,alphaLine] = [200,90,0,255];
        drawSun(lw,hueLine,satLine,litLine,alphaLine)

    } else if (themeName=='dark') {
        [hue,sat,lit,alpha] = [0,0,30,255];
        drawCircle(ctx, 0, 0.5, rad, lw, hue, sat, lit, alpha, 0);
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









function drawToggle(canvas,val,rms) {

    // if(rms===undefined) {
    //     rms = 0.0;
    // }
    // get context and clear for new drawing
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let rPix = HEIGHT*0.13;
    let xC = WIDTH/2;
    let yC = HEIGHT/2;


    //// draw circle
    ctx.fillStyle = "hsl(0, 50%, 50%, 0.1)";
    ctx.strokeStyle = "hsl(200, 0%, 60%, 1.0)";
    ctx.lineWidth = 2;


    // ctx.beginPath();
    // ctx.rect(0, 0, WIDTH, HEIGHT);
    // ctx.fill();

    ctx.beginPath();
    ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);
    ctx.stroke();

    if(val) { // if on
        for(let i=0;i<5;i++) {
            ctx.beginPath();
            rPix = (rPix)**1.05 + rms;
            ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);
            // ctx.stroke();
            let alpha = 0.7/2**i;
            ctx.fillStyle = "hsl(40, 50%, 50%, " + alpha + ")";
            ctx.fill();
        }

        document.getElementById("clickhereText").textContent = "";


    } else {
        // document.getElementById("clickhereText").textContent = "OFF";
    }




}



function drawToggle01(canvas,val) {

    // get context and clear for new drawing
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let rControl = 0.15;
    let rPix = HEIGHT*rControl;
    let xC = WIDTH/2;
    let yC = HEIGHT/2;


    //// draw circle
    ctx.fillStyle = "hsl(0, 50%, 50%, 0.1)";
    ctx.strokeStyle = "hsl(200, 0%, 60%, 1.0)";
    ctx.lineWidth = 2;


    // ctx.beginPath();
    // ctx.rect(0, 0, WIDTH, HEIGHT);
    // ctx.fill();

    ctx.beginPath();
    ctx.ellipse(xC, yC, rPix, rPix, 0, 0, twoPI);

    ctx.stroke();

    if(val) {
        ctx.fill();
    }

    // document.getElementById("muteText").textContent = "Mute (" + val.toString() + ")";

}
