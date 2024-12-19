

function drawToggle(canvas,val) {

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

    document.getElementById("muteText").textContent = "Mute (" + val.toString() + ")";

}
