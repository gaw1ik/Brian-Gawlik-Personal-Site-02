










window.addEventListener("load", setup);

window.addEventListener("resize", handleResize);







function getSize() {

    size_select = document.getElementById("size-select");

    sizeName = size_select.value;

    switch(sizeName) {
        case "8x10":
            [paperWidthIn,paperHeightIn] = [8,10];
            break;
        case "8x12":
            [paperWidthIn,paperHeightIn] = [8,12];
            break;
        case "10x15":
            [paperWidthIn,paperHeightIn] = [10,15];
            break;
        case "11x14":
            [paperWidthIn,paperHeightIn] = [11,14];
            break;
        case "12x18":
            [paperWidthIn,paperHeightIn] = [12,18];
            break;
        case "14x21":
            [paperWidthIn,paperHeightIn] = [14,21];
            break;
        case "16x20":
            [paperWidthIn,paperHeightIn] = [16,20];
            break;
        case "16x24":
            [paperWidthIn,paperHeightIn] = [16,24];
            break;
        case "18x24":
            [paperWidthIn,paperHeightIn] = [18,24];
            break;
        case "18x27":
            [paperWidthIn,paperHeightIn] = [18,27];
            break;
        case "20x24":
            [paperWidthIn,paperHeightIn] = [20,24];
            break;
        case "20x30":
            [paperWidthIn,paperHeightIn] = [20,30];
            break;
        case "22x33":
            [paperWidthIn,paperHeightIn] = [22,33];
            break;
        case "24x30":
            [paperWidthIn,paperHeightIn] = [24,30];
            break;
        case "24x36":
            [paperWidthIn,paperHeightIn] = [24,36];
            break;
        case "30x40":
            [paperWidthIn,paperHeightIn] = [30,40];
            break;
        case "30x45":
            [paperWidthIn,paperHeightIn] = [30,45];
            break;
        case "36x48":
            [paperWidthIn,paperHeightIn] = [36,48];
            break;
        case "40x50":
            [paperWidthIn,paperHeightIn] = [40,50];
            break;
        case "40x60":
            [paperWidthIn,paperHeightIn] = [40,60];
            break;
        case "44x66":
            [paperWidthIn,paperHeightIn] = [44,66];
            break;
    }

    // image = selectImage();

    if (imageAR < 1) { //// switch the dimensions to landscape paper format (as opposed to portrait)

        [paperWidthIn,paperHeightIn] = [paperHeightIn,paperWidthIn];

    }

    return [paperWidthIn,paperHeightIn];
}



function getBorderThickness() {

    borderThickness_select = document.getElementById("borderThickness-select");

    let name = borderThickness_select.value;

    switch(name) {
        case "0":
            borderThicknessIn = 0;
            break;
        case "0.25":
            borderThicknessIn = 0.25;
            break;
        case "0.50":
            borderThicknessIn = 0.50;
            break;
        case "0.75":
            borderThicknessIn = 0.75;
            break;
        case "1.00":
            borderThicknessIn = 1.00;
            break;
    }

    return borderThicknessIn;
}



function selectImage() {

    image_select = document.getElementById("image-select");

    let name = image_select.value;

    switch(name) {
        case "1":
            image = document.getElementById("AstoriaCrossSign");
            break;
        case "2":
            image = document.getElementById("BirdsOnTheLine");
            break;
        case "3":
            image = document.getElementById("BusStop");
            break;
        case "4":
            image = document.getElementById("SidingNo1");
            break;
        case "5":
            image = document.getElementById("StLL3");
            break;
    }

    imageAR = image.height/image.width;

    return image;
}




function drawAll() {

    

    console.log("drawAll")


    // handleResize();

    clearCanvas(ctx0);

    ctxToDrawToNow = ctx0;

    ///////////////////////////////////////////////////////////////////// PAPER (used to be WALL)

    let x = -artboardWo2;
    let y = 0;
    let width = artboardW_Norm;
    let height = 1;
    let [hue, sat, lit] = [0, 0, 99];
    let alpha = 255;

    drawRect(x, y, width, height, 0, hue, sat, lit, alpha, 0);




    ///////////////////////////////////////////////////////////////////// Get Image
    image = selectImage();
    
    console.log("imageAR",imageAR)

    imageW_px = image.width;
    imageH_px = image.height;

    ///////////////////////////////////////////////////////////////////// PAPER
    [paperWidthIn,paperHeightIn] = getSize();

    paperAR = paperHeightIn/paperWidthIn;


    borderThicknessIn = getBorderThickness();

    borderThickness_px = (borderThicknessIn/paperHeightIn) * canvas0.height;




    let imageWidthIn  = paperWidthIn  - 2*borderThicknessIn;
    let imageHeightIn = paperHeightIn - 2*borderThicknessIn;









    ///////////////////////////////////////////////////////////////////// IMAGE



    // image = document.getElementById("AstoriaCrossSign");


    cropping_select = document.getElementById("cropping-select");
    cropType = cropping_select.value;

    switch(cropType) {
        case "nocrop":
        console.log("nocrop")
        if(imageAR>paperAR) {
    
            console.log("tall")
    
            dHeight = image.height;
            dWidth = image.width;
    
            dHeight = canvas0.height - borderThickness_px*2;
            dWidth = dHeight/imageAR;
            
            dx = (canvas0.width  -  dWidth)/2;
            dy = (canvas0.height - dHeight)/2;
    
        } else {
    
            console.log("wide")
    
            dWidth = canvas0.width - borderThickness_px*2;
            dHeight = dWidth*imageAR;
            
            dx = (canvas0.width  -  dWidth)/2;
            dy = (canvas0.height - dHeight)/2;
        }

         
        console.log("[dWidth,dHeight]",[dWidth,dHeight]);
        console.log("[canvas0.width,canvas0.height]",[canvas0.width,canvas0.height]);

        ctx0.drawImage(image,dx,dy,dWidth,dHeight);        

        break;







        case "crop":
        console.log("crop")

        cropAR = imageHeightIn/imageWidthIn
    
        if(cropAR>imageAR) {
    
            console.log("tall")
    
            dHeight = image.height;
            dWidth = image.width;
    
            dHeight = canvas0.height - borderThickness_px*2;
            dWidth = dHeight/imageAR;
            
            dx = (canvas0.width  -  dWidth)/2;
            dy = (canvas0.height - dHeight)/2;
    
        } else {
    
            console.log("wide")
    
            dWidth = canvas0.width - borderThickness_px*2;
            dHeight = dWidth*imageAR;
            
            dx = (canvas0.width  -  dWidth)/2;
            dy = (canvas0.height - dHeight)/2;
        }

        
        console.log("[dWidth,dHeight]",[dWidth,dHeight]);
        console.log("[canvas0.width,canvas0.height]",[canvas0.width,canvas0.height]);

        ctx0.drawImage(image,dx,dy,dWidth,dHeight);

        // [hue,sat,lit,alpha] = [0,70,80,150]; //testing
        [hue,sat,lit,alpha] = [0,0,99,255]; //testing


        

        ///////////////////////// BOTTOM
        x = 0;
        y = canvas0.height-borderThickness_px;
        let w = canvas0.width;
        let h = borderThickness_px;

        ctxToDrawToNow.beginPath();
        ctxToDrawToNow.rect(x,y,w,h);
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();


        ///////////////////////// TOP
        x = 0;
        y = 0;
        w = canvas0.width;
        h = borderThickness_px;

        ctxToDrawToNow.beginPath();
        ctxToDrawToNow.rect(x,y,w,h);
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();


        ///////////////////////// LEFT
        x = 0;
        y = 0;
        w = borderThickness_px;
        h = canvas0.height;

        ctxToDrawToNow.beginPath();
        ctxToDrawToNow.rect(x,y,w,h);
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();


        ///////////////////////// RIGHT
        x = canvas0.width - borderThickness_px;
        y = 0;
        w = borderThickness_px;
        h = canvas0.height;

        ctxToDrawToNow.beginPath();
        ctxToDrawToNow.rect(x,y,w,h);
        ctxToDrawToNow.fillStyle   = 'hsla(' + hue + ', ' +  sat + '%, ' + lit + '%,'  + alpha + ')'; 
        ctxToDrawToNow.fill();


        break;
    }









}






function setup() {

    console.log("setup");

    size_select = document.getElementById("size-select");
    borderThickness_select = document.getElementById("borderThickness-select");
    cropping_select = document.getElementById("cropping-select");
    image_select = document.getElementById("image-select");


    // size_select.addEventListener("input", drawAll);
    // borderThickness_select.addEventListener("input", drawAll);
    // cropping_select.addEventListener("input", drawAll);

    size_select.addEventListener("input", handleResize);
    borderThickness_select.addEventListener("input", handleResize);
    cropping_select.addEventListener("input", handleResize);
    image_select.addEventListener("input", handleResize);



    image = selectImage();
    [paperWidthIn,paperHeightIn] = getSize();
    borderThicknessIn = getBorderThickness();
    



    // slider_paperWidth = document.getElementById("slider_paperWidth");
    // slider_paperHeight = document.getElementById("slider_paperHeight");
    // slider_borderThickness = document.getElementById("slider_borderThickness");



    paperAR = paperHeightIn/paperWidthIn;

    // document.getElementById("slider_paperWidth").addEventListener("input", drawAll);
    // document.getElementById("slider_paperHeight").addEventListener("input", drawAll);
    // document.getElementById("slider_borderThickness").addEventListener("input", drawAll);

    xCenterOffset = 0;
    yCenterOffset = 0;
    xOrigin = 0.5;
    yOrigin = 0.0;
    canvasPad = 0.10;

    artboardH = 1080;
    artboardAR = paperAR;
    screenAR = artboardAR;
    artboardW = artboardH / artboardAR;
    artboardWo2 = 1/artboardAR/2;
    artboardW_Norm = 1/artboardAR;
    screenH = artboardH * (screenAR/artboardAR);
    screenW = artboardW;

    // canvas
    canvas0 = document.getElementById("canvas0");
    ctx0 = canvas0.getContext("2d");
    // canvas1 = document.getElementById("canvas1");
    // ctx1 = canvas1.getContext("2d");

    canvas0.width  = artboardW;
    canvas0.height = artboardH;

    // canvas1.width  = artboardW;
    // canvas1.height = artboardH;

    // handleResize();
    // drawAll();

    handleResize();
}






function handleResize() {

    console.log("handleResize");

    image = selectImage();
    [paperWidthIn, paperHeightIn] = getSize();
    paperAR = paperHeightIn/paperWidthIn;

    image_info_size = document.getElementById("image-info-size");
    // image_info_dpi = document.getElementById("image-info-dpi");
    image_info_orientation = document.getElementById("image-info-orientation");

    imageW_px = image.width;
    imageH_px = image.height;
    image_info_size.innerText = imageW_px.toString() + " x " + imageH_px.toString() + "px";
    // imageDPI = imageH_px
    // image_info_dpi.innerText = "";
    if(imageAR>1) {
        image_info_orientation.innerText = "Orientation: Tall";
    } else if (imageAR==1) {
        image_info_orientation.innerText = "Orientation: Square";
    } else {
        image_info_orientation.innerText = "Orientation: Wide";
    }

    canvas0 = document.getElementById("canvas0");
    canvasContainer = document.getElementById("canvasContainer");

    canvasContainer_width  = canvasContainer.clientWidth;
    canvasContainer_height = canvasContainer.clientHeight;

    // console.log("canvasContainer_height",canvasContainer_height);
    canvasContainer_AR = canvasContainer_height/canvasContainer_width;

    artboardAR = paperAR;
    screenAR = artboardAR;
    artboardW = artboardH / artboardAR;
    artboardWo2 = 1/artboardAR/2;
    artboardW_Norm = 1/artboardAR;
    screenH = artboardH * (screenAR/artboardAR);
    screenW = artboardW;

    if( canvasContainer_AR < screenAR ){
        //console.log("lower than")
        canvas0_style_height = canvasContainer_height * (1-canvasPad);
        canvas0_style_width  = canvas0_style_height / screenAR;
    } else {
        //console.log("greater than")
        canvas0_style_width  = canvasContainer_width * (1-canvasPad);
        canvas0_style_height = canvas0_style_width * screenAR;
    }

    // canvas0_style_width = canvasContainer_width;
    // canvas0_style_height = canvasContainer_height;


    canvas0.style.height = canvas0_style_height.toString() + "px";
    canvas0.style.width  = canvas0_style_width.toString()  + "px";
    canvas0_style_top  = (canvasContainer_height - canvas0_style_height)/2;
    canvas0_style_left = (canvasContainer_width  - canvas0_style_width )/2;
    canvas0.style.top = canvas0_style_top.toString() + "px";
    canvas0.style.left  = canvas0_style_left.toString()  + "px";

    canvas0.height = artboardH;
    canvas0.width = artboardH / artboardAR;

    // console.log("canvas0_styletop",(canvasContainer_height - canvas0_style_height)/2);


    xCenterOffset = 1/artboardAR * xOrigin;
    yCenterOffset = yOrigin;

    // console.log("[top, left]",[top, left])

    // canvas0.style.left = left + "px";
    // canvas0.style.top  = top  + "px";

    drawAll();
}





























