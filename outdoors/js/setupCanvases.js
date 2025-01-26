


function setupCanvases() {

    window.addEventListener("resize",handleResize);



    console.log("window loaded");


    





    // PARAMS = setInitialParams();


    // INITIAL STATE VALUES
    currentMuteState = 0;



    canvasViz01 = document.getElementById("canvasViz01");
    canvasViz02 = document.getElementById("canvasViz02");








    // let muteControl_clientRectX = muteControl.getBoundingClientRect().x;
    // let muteControl_clientRectY = muteControl.getBoundingClientRect().y;
    // let clickhereText = document.getElementById("clickhereText");
    // clickhereText.style.left = muteControl_clientRectX + 15 + "px";
    // clickhereText.style.top  = muteControl_clientRectY + 90 + "px"
    
    canvas_setTheme = document.getElementById("canvas_setTheme");
    canvas_setTheme.addEventListener("click", setTheme); // commented this out bc setupCanvases() is already called in setup()
    // draw_canvasSetTheme();


    // console.log("canvas",canvasViz01)

    // handleResize();

    
    
    setInterval(drawVisualizer,34);




}