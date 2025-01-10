

// window.addEventListener("load", setupCanvases);


function setInitialParams() {

    let params = {
        background_gain:0.3,
        background_LPF:0.35,
        background_hiss:0.3,
        background_param:0.0,

        wash_gain:0.4,
        wash_period:0.4,

        rush_gain:0.20,
        rush_speed:1.0,

        insects_gain:0.5,
        insects_rate:0.4,
        insects_period:0.6,
        insects_freq:0.7,

        birds_gain:0.5,
        birds_thresh:0.5,

        master_gain:0.5,
        master_LPF:0.7,
    }

    return params;
}




function setupCanvases() {

    window.addEventListener("resize",handleResize);



    console.log("window loaded");


    

    myrng = new Math.seedrandom();

    onePI = Math.PI; 
    twoPI = Math.PI * 2;
    PIo2  = Math.PI * 0.5;
    PIo4  = Math.PI * 0.25;
    PIo8  = Math.PI * 0.125;
    PIo16 = Math.PI * 0.0625;

    PARAMS = setInitialParams();

    ///////////////////////////////////////////////////////////////////////////
    CANVAS = [];

    for(let i=0; i<Object.keys(PARAMS).length; i++) {
        let paramName = Object.keys(PARAMS)[i];
        CANVAS.push( document.getElementById("canvas_" + paramName) );
    }

    // // BACKGROUND
    // CANVAS.push( document.getElementById("canvas_background_gain") );
    // CANVAS.push( document.getElementById("canvas_background_hiss") );
    // CANVAS.push( document.getElementById("canvas_background_filt") );
    // CANVAS.push( document.getElementById("canvas_background_param") );

    // // WASH
    // CANVAS.push( document.getElementById("canvas_wash_gain") );
    // CANVAS.push( document.getElementById("canvas_wash_period") );

    // // RUSH
    // CANVAS.push( document.getElementById("canvas_rush_gain") );
    // CANVAS.push( document.getElementById("canvas_rush_speed") );

    // // INSECTS
    // CANVAS.push( document.getElementById("canvas_insects_gain") );
    // CANVAS.push( document.getElementById("canvas_insects_period") );
    // CANVAS.push( document.getElementById("canvas_insects_rate") );
    // CANVAS.push( document.getElementById("canvas_insects_freq") );

    // // BIRDS
    // CANVAS.push( document.getElementById("canvas_birds_gain") );
    // CANVAS.push( document.getElementById("canvas_birds_thresh") );
    // // CANVAS.push( document.getElementById("canvas_5c") );

    // CANVAS.push( document.getElementById("canvas_master_gain") );
    // CANVAS.push( document.getElementById("canvas_master_filt") );


    // function updateRNBO_background_hiss() {
    //     let adjustedValue = PARAMS.background_hiss*120.0;
    //     RNBO_background_hiss = device.parametersById.get("backgroun_hiss");
    //     RNBO_background_hiss.value = adjustedValue;
    // }


    // INITIAL STATE VALUES
    currentMuteState = 0;
    // VAL = [0.75,0.15,0.03,0.1]; // Initial Param Values
    // VAL = [0.832, 0.15, 0.30, 0.22];
    // VAL = [];
    // for(let i=0; i<CANVAS.length; i++) {
    //     VAL.push(getRandomFloat());
    // }

    // PARAMS = {
    //     background_gain:0,
    //     background_filt:0,
    //     background_hiss:0,
    //     background_param:0,

    //     wash_gain:0,
    //     wash_period:0,

    //     rush_gain:0,
    //     rush_speed:0,

    //     insects_gain:0,
    //     insects_rate:0,
    //     insects_period:0,
    //     insects_freq:0,

    //     birds_gain:0,
    //     // birds_filt:0,
    //     birds_thresh:0,

    //     master_gain:0,
    //     master_filt:0,
    // }


    LASTY = [0,0,0,0];

    xC_arr = [];
    yC_arr = [];
    rMaxThis_arr = [];
    vizCallMax = 64;
    vizCall = vizCallMax; // initially set to maxCall
    SHAPES = [];
    for(let i=0; i<1; i++) {
        let xC1 = 0.5;
        let yC1 = 0.3;
        let xC2 = -0.5;
        let yC2 = 1.0;
        // let speed = getRandomFloat(1.0,8.0);
        // let aspect = 1.0;
        // let age = 0.0;
        let shape = {xC1:xC1, yC1:yC1, xC2:xC2, yC2:yC2,};
        SHAPES.push(shape);
        // console.log(shape);
    }


    canvasViz01 = document.getElementById("canvasViz01");



    // CANVAS = [canvas1,canvas1b,canvas2,canvas3,canvas4];



    // /////////////////////////// INITIALIZE MUTE CONTROL SIZE
    // muteControl = document.getElementById("mute");
    // muteControl.addEventListener('click', playSound);








    handleResize();


    // let muteControl_clientRectX = muteControl.getBoundingClientRect().x;
    // let muteControl_clientRectY = muteControl.getBoundingClientRect().y;
    // let clickhereText = document.getElementById("clickhereText");
    // clickhereText.style.left = muteControl_clientRectX + 15 + "px";
    // clickhereText.style.top  = muteControl_clientRectY + 90 + "px";


    
    





}