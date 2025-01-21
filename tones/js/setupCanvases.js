


function setInitialParams() {

    let params = {

        master_gain:0.8,
        master_LPF:1.0,
        chance:0.2,
        time:0.4,
        release:0.20,

    }

    return params;
}







function setupCanvases() {

    


    console.log("window loaded");


    

    PARAMS = setInitialParams();



    // INITIAL STATE VALUES
    currentMuteState = 0;
    // VAL = [0.75,0.15,0.03,0.1]; // Initial Param Values
    // VAL = [0.832, 0.15, 0.30, 0.22];
    VAL = [0.917, 0.400, 0.594, 0.682];
    LASTY = [0,0,0,0];

    xC_arr = [];
    yC_arr = [];
    rMaxThis_arr = [];
    vizCallMax = 64;
    vizCall = vizCallMax; // initially set to maxCall
    SHAPES = [];
    for(let i=0; i<8; i++) {
        let xC = getRandomFloat();
        let yC = getRandomFloat();
        let speed = getRandomFloat(1.0,8.0);
        let aspect = 1.0;
        let age = 0.0;
        let shape = {rad:0, xC:xC, yC:yC, aspect:aspect, alpha:1.0, speed:speed, age:age};
        SHAPES.push(shape);
        // console.log(shape);
    }


    canvasViz01 = document.getElementById("canvasViz01");




    // canvas_gain = document.getElementById("canvas_gain");
    // canvas_master_LPF = document.getElementById("canvas_master_LPF");
    // canvas_chance = document.getElementById("canvas_chance");
    // canvas_time = document.getElementById("canvas_time");
    // canvas_release = document.getElementById("canvas_release");


    // CANVAS = [canvas_gain,
    //     canvas_master_LPF,
    //     canvas_chance,
    //     canvas_time,
    //     canvas_release];



    // /////////////////////////// INITIALIZE MUTE CONTROL SIZE
    // muteControl = document.getElementById("mute");
    // muteControl.addEventListener('click', playSound);








    handleResize();


    // let muteControl_clientRectX = muteControl.getBoundingClientRect().x;
    // let muteControl_clientRectY = muteControl.getBoundingClientRect().y;
    // let clickhereText = document.getElementById("clickhereText");
    // clickhereText.style.left = muteControl_clientRectX + 15 + "px";
    // clickhereText.style.top  = muteControl_clientRectY + 90 + "px";


    
    
    setInterval(drawVisualizer,34);





}
