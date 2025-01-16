

// window.addEventListener("load", setupCanvases);


function setInitialParams() {

    let params = {
        background_gain:0.3,
        background_LPF:0.35,
        background_hiss:0.3,
        // background_param:0.0,

        wash_gain:0.4,
        wash_period:0.4,

        rush_gain:0.20,
        rush_speed:1.0,

        insects_gain:0.5,
        insects_rate:0.4,
        insects_period:0.6,
        insects_freq:0.7,

        birds_gain:0.5,
        birds_period0:0.5,

        master_gain:0.5,
        master_LPF:0.7,
    }

    return params;
}




function setupCanvases() {

    window.addEventListener("resize",handleResize);



    console.log("window loaded");


    





    PARAMS = setInitialParams();


    // INITIAL STATE VALUES
    currentMuteState = 0;



    canvasViz01 = document.getElementById("canvasViz01");
    // canvasViz02 = document.getElementById("canvasViz02");






    handleResize();


    // let muteControl_clientRectX = muteControl.getBoundingClientRect().x;
    // let muteControl_clientRectY = muteControl.getBoundingClientRect().y;
    // let clickhereText = document.getElementById("clickhereText");
    // clickhereText.style.left = muteControl_clientRectX + 15 + "px";
    // clickhereText.style.top  = muteControl_clientRectY + 90 + "px";


    console.log("canvas",canvasViz01)
    console.log("VIZ_SHAPES",VIZ_SHAPES)
    
    
    setInterval(drawVisualizer,34);
// setInterval(drawVisualizer2,34);




}