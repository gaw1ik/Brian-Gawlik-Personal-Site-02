




function setupCanvases() {

    window.addEventListener("resize",handleResize);



    console.log("window loaded");


    

    // INITIAL STATE VALUES
    currentMuteState = 0;



    canvasViz01 = document.getElementById("canvasViz01");
    canvasViz02 = document.getElementById("canvasViz02");






    handleResize();


    // let muteControl_clientRectX = muteControl.getBoundingClientRect().x;
    // let muteControl_clientRectY = muteControl.getBoundingClientRect().y;
    // let clickhereText = document.getElementById("clickhereText");
    // clickhereText.style.left = muteControl_clientRectX + 15 + "px";
    // clickhereText.style.top  = muteControl_clientRectY + 90 + "px";


    // console.log("canvas",canvasViz01)
    // console.log("VIZ_SHAPES",VIZ_SHAPES)

    canvas_setTheme = document.getElementById("canvas_setTheme");
    canvas_setTheme.addEventListener("click", setTheme); // commented this out bc setupCanvases() is already called in setup()
    // draw_canvasSetTheme();
    
    
    setInterval(drawVisualizer,34);
// setInterval(drawVisualizer2,34);




}