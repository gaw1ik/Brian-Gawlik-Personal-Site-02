







function setupCanvases() {

    
    console.log("window loaded");

    mobileWarning = document.getElementById("mobileWarning");
    proceedButton = document.getElementById("proceedButton");

    //// alternatively could use this...
    // let str = navigator.userAgent;
    // let substring = 'Mobi';
    // function containsSubstring(str, substring) {
    //     return str.includes(substring);
    // }

    // const isLandscape = () => {
    //     return window.matchMedia("(orientation: landscape)").matches;
    //   }
      
    // const handleOrientationChange = (event) => {
    // const isCurrentlyLandscape = event.matches;
    // if (isCurrentlyLandscape) {
    //     deviceWidth = screen.height
    // } else {
    //     deviceWidth = screen.width
    // }
    // }

    if(window.matchMedia("(orientation: landscape)").matches) {
        deviceWidth = screen.height;
    } else {
        deviceWidth = screen.width
    }

    if(deviceWidth<800) {

        mobileWarning.style.display = "flex";

        proceedButton.addEventListener("click",proceed);

        function proceed() {
            console.log("proceed");

            mobileWarning.style.display = "none";
            proceedButton.removeEventListener("click",proceed);

            document.body.addEventListener("click",playSound);


        }
    }


    let canvases = document.getElementsByClassName("dial");
    for(let i=0; i<canvases.length; i++) {
        canvases[i].style.cursor="grab";
    }

    // PARAMS = setInitialParams();



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
        let shape = {rad:0, xC:xC, yC:yC, aspect:aspect, alpha:1.0, speed:speed, age:age, on:0};
        SHAPES.push(shape);
        // console.log(shape);
    }


    canvasViz01 = document.getElementById("canvasViz01");

    canvas_onoff = document.getElementById("canvas_onoff");





    // canvas_gain = document.getElementById("canvas_gain");
    // canvas_master_lpf = document.getElementById("canvas_master_lpf");
    // canvas_chance = document.getElementById("canvas_chance");
    // canvas_time = document.getElementById("canvas_time");
    // canvas_release = document.getElementById("canvas_release");


    // CANVAS = [canvas_gain,
    //     canvas_master_lpf,
    //     canvas_chance,
    //     canvas_time,
    //     canvas_release];



    // /////////////////////////// INITIALIZE MUTE CONTROL SIZE
    // muteControl = document.getElementById("mute");
    // muteControl.addEventListener('click', playSound);



    canvas_setTheme = document.getElementById("canvas_setTheme");
    canvas_setTheme.addEventListener("click", setTheme); // commented this out bc setupCanvases() is already called in setup()
    // draw_canvasSetTheme();





    // handleResize(); // commented out bc settheme already does it.


    // let muteControl_clientRectX = muteControl.getBoundingClientRect().x;
    // let muteControl_clientRectY = muteControl.getBoundingClientRect().y;
    // let clickhereText = document.getElementById("clickhereText");
    // clickhereText.style.left = muteControl_clientRectX + 15 + "px";
    // clickhereText.style.top  = muteControl_clientRectY + 90 + "px";


    
    
    setInterval(draw_visualizer,34);

    // setInterval(updatefreq,1000);

    // FREQ1 = 8;
    // FREQ2 = [16,16,16,16,16,16,16,16];
    // function updatefreq() {

    //     FREQ1 = getRandomFloat() * 8 / 8; 

    //     for(let i=0; i<8; i++) {
    //         FREQ2[i] = getRandomFloat(0.5,1.0) * 16 / 8; 

    //     }

    //     // console.log(FREQ1,FREQ2)

    // }






}
