function handleResize() {

    mobileCutoff = 700;

    console.log("resize")

    window_innerWidth = window.innerWidth;
    window_innerHeight = window.innerHeight;

    siteContainer = document.getElementById("siteContainer");
    // siteContainer.style.height = window_innerHeight + "px";

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

    let gridColumnWidth = Math.min(window_innerWidth*0.15,200);
    let gridLastColumnWidth = gridColumnWidth;
    // let gridLastColumnWidth = Math.min(window_innerWidth*0.075,250);

    controlRow01.style.gridTemplateColumns = "repeat(5, " + gridColumnWidth + "px)";
    // controlRow01.style.gridTemplateColumns = gridColumnWidth + "px " + gridColumnWidth + "px " + gridColumnWidth + "px "+ gridColumnWidth + "px "+ gridLastColumnWidth + "px";


    // let controlRow0W2idth = gridColumnWidth*5;
    // controlRow02.style.gridTemplateColumns = controlRow0W2idth + "px)";

    ////////// Visualizer Canvas
    WIDTHSTYLE_VIZ = window_innerWidth;
    HEIGHTSTYLE_VIZ = window_innerHeight;
    WIDTH_VIZ = WIDTHSTYLE_VIZ*2;
    HEIGHT_VIZ = HEIGHTSTYLE_VIZ*2;

    canvasViz01.width = WIDTH_VIZ;
    canvasViz01.height = HEIGHT_VIZ;
    canvasViz01.style.width = WIDTHSTYLE_VIZ.toString() + "px";
    canvasViz01.style.height = HEIGHTSTYLE_VIZ.toString() + "px";



    // ////////// Control Canvases
    // if( window_innerWidth < mobileCutoff ) { // vertical
    //     // WIDTHSTYLE = window_innerWidth*0.2;
    //     WIDTHSTYLE = 100;
    //     HEIGHTSTYLE = WIDTHSTYLE;
    // } else { // horizontal
        HEIGHTSTYLE = Math.min(window_innerWidth*0.07,100);
        WIDTHSTYLE = HEIGHTSTYLE;
    // }

    WIDTH = WIDTHSTYLE*2;
    HEIGHT = HEIGHTSTYLE*2;

    for(let i=0; i<CANVAS.length; i++) {
        let canvas = CANVAS[i];
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        canvas.style.width = WIDTHSTYLE.toString() + "px";
        canvas.style.height = HEIGHTSTYLE.toString() + "px";

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

    let controlRow01_width = document.getElementById("controlRow01").clientWidth;
    // let controlRow02_width = controlRow01_width;
    // console.log("controlRow01_width",controlRow01_width)

    document.getElementById("controlRow02").style.width = controlRow01_width.toString() + "px";



    let CONTROLVIZ = document.getElementsByClassName("controlViz");

    let controlViz_widthstyle = WIDTHSTYLE*1.5;
    let controlViz_heightstyle = HEIGHTSTYLE;
    let controlViz_width = controlViz_widthstyle*2;
    let controlViz_height = controlViz_heightstyle*2;


    for(let i=0; i<CONTROLVIZ.length; i++) {
        let canvas = CONTROLVIZ[i];
        canvas.width = controlViz_width;
        canvas.height = controlViz_height;
        canvas.style.width = controlViz_widthstyle.toString() + "px";
        canvas.style.height = controlViz_heightstyle.toString() + "px";
    }

    // ////////// Mute Control Canvas
    // muteControl.width = WIDTH;
    // muteControl.height = HEIGHT;
    // muteControl.style.width = WIDTHSTYLE.toString() + "px";
    // muteControl.style.height = HEIGHTSTYLE.toString() + "px";

    // drawToggle(muteControl,currentMuteState,0);




}
