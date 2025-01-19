




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

        // document.getElementById("clickhereText").textContent = "";


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
