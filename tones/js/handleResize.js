function handleResize() {

    console.log("resize");

    window_innerWidth = window.innerWidth;
    window_innerHeight = window.innerHeight;

    siteContainer = document.getElementById("siteContainer");
    siteContainer.style.height = window_innerHeight + "px";

    clickhereText = document.getElementById("clickhereText");


    // if(window_innerWidth < mobileCutoff) { // Mobile
    //     let controlRow01 = document.getElementById("controlRow01");
    //     controlRow01.style.gridTemplateRows = "200px 200px";
    //     controlRow01.style.gridTemplateColumns = "200px 200px";
    //     clickhereText.style.top = "20%";
    //     clickhereText.style.left = "64%";

    // } else { // Desktop
        // let controlRow01 = document.getElementById("controlRow01");
        // controlRow01.style.gridTemplateRows = "200px";
        // controlRow01.style.gridTemplateColumns = "200px 200px 200px 200px";
        // clickhereText.style.top = "30%";
        // clickhereText.style.left = "69%";
    // }


    ////////// Visualizer Canvas
    // WIDTHSTYLE_VIZ = window_innerWidth;
    // HEIGHTSTYLE_VIZ = window_innerHeight;
    // WIDTH_VIZ = WIDTHSTYLE_VIZ*2;
    // HEIGHT_VIZ = HEIGHTSTYLE_VIZ*2;

    // canvasViz01.width = WIDTH_VIZ;
    // canvasViz01.height = HEIGHT_VIZ;
    // canvasViz01.style.width = WIDTHSTYLE_VIZ.toString() + "px";
    // canvasViz01.style.height = HEIGHTSTYLE_VIZ.toString() + "px";


    canvasViz01.width  = canvasViz01.clientWidth  * 2;
    canvasViz01.height = canvasViz01.clientHeight * 2;


    // document.getElementById()

    ////////// Control Canvases
    // if( window_innerWidth < mobileCutoff ) { //horizontal
    //     // WIDTHSTYLE = window_innerWidth*0.2;
    //     WIDTHSTYLE = 150;
    //     HEIGHTSTYLE = WIDTHSTYLE;
    // } else { // vertical
    //     HEIGHTSTYLE = window_innerHeight*0.15;
    //     WIDTHSTYLE = HEIGHTSTYLE;
    // }

    var WIDTHSTYLE = 150;
    var HEIGHTSTYLE = WIDTHSTYLE*0.7;
    var WIDTH = WIDTHSTYLE*2;
    var HEIGHT = HEIGHTSTYLE*2;

    // if( window_innerWidth < 500 ) {
    //     WIDTHSTYLE = window_innerWidth*0.30;
    //     HEIGHTSTYLE = WIDTHSTYLE*0.7;
    //     WIDTH = WIDTHSTYLE*2;
    //     HEIGHT = HEIGHTSTYLE*2;

    //     for(let i=2; i<CANVAS.length; i++) {
    //         let canvas = CANVAS[i];
    //         canvas.width = WIDTH;
    //         canvas.height = HEIGHT;
    //         canvas.style.width = WIDTHSTYLE.toString() + "px";
    //         canvas.style.height = HEIGHTSTYLE.toString() + "px";
    //         let val = VAL[i];
    //         drawKnob(canvas,val);  
    //     }

    //     WIDTHSTYLE = WIDTHSTYLE*0.6;
    //     HEIGHTSTYLE = WIDTHSTYLE*1.0;
    //     WIDTH = WIDTHSTYLE*2;
    //     HEIGHT = HEIGHTSTYLE*2;
    //     for(let i=0; i<2; i++) {

    //         let canvas = CANVAS[i];
    //         canvas.width = WIDTH;
    //         canvas.height = HEIGHT;
    //         canvas.style.width = WIDTHSTYLE.toString() + "px";
    //         canvas.style.height = HEIGHTSTYLE.toString() + "px";
    //         let val = VAL[i];
    //         drawKnob(canvas,val); 
    //     }

    // } else {
        // WIDTHSTYLE = Math.min(window_innerWidth*0.14,150);


    for(let i=0; i<canvases.length; i++) {

        let canvas = canvases[i];

        let activeCanvasID = canvas.id;
        let activeCanvasName = get_activeCanvasName(activeCanvasID);

        // WIDTHSTYLE = 150;
        // HEIGHTSTYLE = WIDTHSTYLE*0.7;
        // WIDTH = WIDTHSTYLE*2;
        // HEIGHT = HEIGHTSTYLE*2;

        canvas_style_width = canvas.clientWidth;
        canvas_style_height = canvas.clientHeight;
        canvas.width = canvas_style_width*2;
        canvas.height = canvas_style_height*2;

        // console.log("activeCanvasName",activeCanvasName);
        let val = PARAMS[activeCanvasName];

        // if(activeCanvasName=="master_gain" || activeCanvasName=="master_LPF") {
        //     drawKnobDrive(canvas,val);
        // } else {
            drawKnob(canvas,val);
        // }    
    }


    // }

    // ONOFF CONTROL
    canvas_onoff.width  = canvas_onoff.clientWidth  * 2;
    canvas_onoff.height = canvas_onoff.clientHeight * 2;
    draw_onoff();




    var WIDTHSTYLE_VIZ  = canvas_setTheme.clientWidth;
    var HEIGHTSTYLE_VIZ = canvas_setTheme.clientHeight;
    var WIDTH_VIZ  = WIDTHSTYLE_VIZ  * 2;
    var HEIGHT_VIZ = HEIGHTSTYLE_VIZ * 2;
    canvas_setTheme.width  = WIDTH_VIZ ;
    canvas_setTheme.height = HEIGHT_VIZ;
    draw_canvasSetTheme();



}
