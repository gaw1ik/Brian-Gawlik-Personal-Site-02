function handleResize() {

    mobileCutoff = 700;

    console.log("resize")

    window_innerWidth  = window.innerWidth;
    window_innerHeight = window.innerHeight;

    siteContainer = document.getElementById("siteContainer");
    // siteContainer.style.height = window_innerHeight + "px";

    // console.log("[window_innerWidth,window_innerHeight]",[window_innerWidth,window_innerHeight]);

    clickhereText = document.getElementById("clickhereText");


    // if(window_innerWidth < mobileCutoff) { // Mobile
    //     let controlRow01 = document.getElementById("controlRow01");
    //     controlRow01.style.gridTemplateRows = "200px 200px";
    //     controlRow01.style.gridTemplateColumns = "200px 200px";
    //     clickhereText.style.top = "20%";
    //     clickhereText.style.left = "64%";

    // } else { // Desktop
    //     let controlRow01 = document.getElementById("controlRow01");
    //     controlRow01.style.gridTemplateRows = "200px";
    //     controlRow01.style.gridTemplateColumns = "200px 200px 200px 200px 200px";
    //     clickhereText.style.top = "30%";
    //     clickhereText.style.left = "69%";
    // }

    // let h1 = document.getElementsByTagName("h1");
    // let h2 = document.getElementsByTagName("h2");
    // let h3 = document.getElementsByTagName("h3"); 

    // if(window_innerWidth < mobileCutoff) { // Mobile
    //     h1.style.fontSize = '1rem';
    //     h2.style.fontSize = '1rem';
    //     h3.style.fontSize = '1rem'; 

    // } else { // Desktop
    //     h1.style.fontSize = '1rem';
    //     h2.style.fontSize = '1rem';
    //     h3.style.fontSize = '1rem'; 
    // }



    var gridColumnWidth = Math.min(window_innerWidth*0.15,200);
    // var gridLastColumnWidth = gridColumnWidth;
    // let gridLastColumnWidth = Math.min(window_innerWidth*0.075,250);

    // controlRow01.style.gridTemplateColumns = gridColumnWidth + "px " + gridColumnWidth + "px " + gridColumnWidth + "px "+ gridColumnWidth + "px "+ gridLastColumnWidth + "px";

    // Mobile Rotated
    if(window_innerHeight < 550) {
        // console.log("<550")
        gridColumnWidth = Math.min(window_innerWidth*0.10,200);
        // gridLastColumnWidth = gridColumnWidth;
    } 

    // controlRow01.style.gridTemplateColumns = "repeat(5, " + gridColumnWidth + "px)";


    // let controlRow0W2idth = gridColumnWidth*5;
    // controlRow02.style.gridTemplateColumns = controlRow0W2idth + "px)";

    ////////// Visualizer Canvas
    // WIDTHSTYLE_VIZ = window_innerWidth;
    // HEIGHTSTYLE_VIZ = window_innerHeight;
    // WIDTH_VIZ = WIDTHSTYLE_VIZ*2;
    // HEIGHT_VIZ = HEIGHTSTYLE_VIZ*2;

    WIDTHSTYLE_VIZ  = canvasViz01.clientWidth;
    HEIGHTSTYLE_VIZ = canvasViz01.clientHeight;

    WIDTH_VIZ  = WIDTHSTYLE_VIZ  * 2;
    HEIGHT_VIZ = HEIGHTSTYLE_VIZ * 2;

    canvasViz01.width  = WIDTH_VIZ ;
    canvasViz01.height = HEIGHT_VIZ;
    // canvasViz01.style.width = WIDTHSTYLE_VIZ.toString() + "px";
    // canvasViz01.style.height = HEIGHTSTYLE_VIZ.toString() + "px";


    // canvasViz02.width = WIDTH_VIZ;
    // canvasViz02.height = HEIGHT_VIZ;
    // let canvasViz02_clientLeft = document.getElementById("controlRow02").getBoundingClientRect().x;
    // let canvasViz02_clientTop = document.getElementById("controlRow02").getBoundingClientRect().y;

    // fwidth = 30;

    // canvasViz02.style.left = canvasViz02_clientLeft-fwidth + "px";
    // canvasViz02.style.top = canvasViz02_clientTop-fwidth + "px";

    // let canvasViz02_styleWidth = document.getElementById("controlRow01").getBoundingClientRect().right - canvasViz02_clientLeft+fwidth*2;
    // let canvasViz02_styleHeight = document.getElementById("controlRow01").getBoundingClientRect().bottom - canvasViz02_clientTop+fwidth*2;

    // canvasViz02.style.width = canvasViz02_styleWidth + "px";
    // canvasViz02.style.height = canvasViz02_styleHeight + "px";


    //////////// Control Canvases
    // HEIGHTSTYLE = Math.min(gridColumnWidth/2,100);
    // WIDTHSTYLE = HEIGHTSTYLE;
    
    // WIDTH = WIDTHSTYLE*2;
    // HEIGHT = HEIGHTSTYLE*2;

    // for(let i=0; i<blankControlCanvases.length; i++) {
    //     let canvas = blankControlCanvases[i];
    //     canvas.width = WIDTH;
    //     canvas.height = HEIGHT;
    //     canvas.style.width = WIDTHSTYLE.toString() + "px";
    //     canvas.style.height = HEIGHTSTYLE.toString() + "px";
    // }

    for(let i=0; i<canvases.length; i++) {
        let canvas = canvases[i];
        // canvas.width = WIDTH;
        // canvas.height = HEIGHT;
        // canvas.style.width = WIDTHSTYLE.toString() + "px";
        // canvas.style.height = HEIGHTSTYLE.toString() + "px";

        canvas_style_width = canvas.clientWidth;
        canvas_style_height = canvas.clientHeight;
        canvas.width = canvas_style_width*2;
        canvas.height = canvas_style_height*2;

        let activeCanvasID = canvas.id;
        // activeCanvasNum = activeCanvasID.substr(6,1) - 1; // index of the current active canvas (0,1,2,3,etc)
        let activeCanvasName = get_activeCanvasName(activeCanvasID);

        // console.log("activeCanvasName",activeCanvasName);
        let val = PARAMS[activeCanvasName];
        // if(i==0) {
        //     drawKnobDrive(canvas,val);
        // } else {
            drawKnob(canvas,val);
        // }    
    }

    // let controlRow01_width = document.getElementById("controlRow01").clientWidth;

    // document.getElementById("controlRow02").style.width = controlRow01_width.toString() + "px";



    let CONTROLVIZ = document.getElementsByClassName("controlViz");

    for(let i=0; i<CONTROLVIZ.length; i++) {
        let canvas = CONTROLVIZ[i];
        canvas.width = canvas.clientWidth*2;
        canvas.height = canvas.clientHeight*2;
    }

    let CONTROLVIZ02 = document.getElementsByClassName("controlViz02");

    for(let i=0; i<CONTROLVIZ02.length; i++) {
        let canvas = CONTROLVIZ02[i];
        canvas.width = canvas.clientWidth*2;
        canvas.height = canvas.clientHeight*2;
    }

    // ////////// Mute Control Canvas
    // muteControl.width = WIDTH;
    // muteControl.height = HEIGHT;
    // muteControl.style.width = WIDTHSTYLE.toString() + "px";
    // muteControl.style.height = HEIGHTSTYLE.toString() + "px";

    // drawToggle(muteControl,currentMuteState,0);


    WIDTHSTYLE_VIZ  = canvas_setTheme.clientWidth;
    HEIGHTSTYLE_VIZ = canvas_setTheme.clientHeight;
    WIDTH_VIZ  = WIDTHSTYLE_VIZ  * 2;
    HEIGHT_VIZ = HEIGHTSTYLE_VIZ * 2;
    canvas_setTheme.width  = WIDTH_VIZ ;
    canvas_setTheme.height = HEIGHT_VIZ;
    draw_canvasSetTheme();


}
