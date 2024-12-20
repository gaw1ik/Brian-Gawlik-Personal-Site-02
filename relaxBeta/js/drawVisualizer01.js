



function drawVisualizer(canvas,val0) {

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let val = Math.tanh((val0+0.4)*4.0);

    // let val = 1.0;

    // let nShapes = 12;

    let rMax = 0.8;

    // let alpha = 0.5 * (1 - vizCall/vizCallMax);
    // let alpha = 1.0;

    // vizCall = vizCall + 1;

    // if(vizCall>32) {

    //     vizCall = 0; // reset vizCall

    //     for(let i=0; i<nShapes; i++) {
    //         let xC = getRandomInt(0, WIDTH_VIZ);
    //         let yC = getRandomInt(0, HEIGHT_VIZ);
    //         xC_arr[i] = xC;
    //         yC_arr[i] = yC;
    //         rMaxThis_arr[i] = getRandomFloat(0.1,1.0);
    //     }

    // }

    // console.log("vizCall",vizCall)
    
    for(let i=0; i<SHAPES.length; i++) {
        

        let shape = SHAPES[i];

        let speed = shape.speed;
        let xC = shape.xC - 0.001 + getRandomFloat(0.0007,0.001)*speed*val0*4.0;
        let yC = shape.yC + getRandomFloat(0.0007,0.001)*speed;
        let rad = shape.rad + 0.001 + getRandomFloat(0.001,0.01)*val0*4.0;
        // let aspect = shape.aspect + randomSign() * val*getRandomFloat(0.005,0.01);
        let age = shape.age + 0.01;
        let aspect = 1.0 + val0*0.1;
        let alpha = shape.alpha * 0.96;

        let xCPix = xC*WIDTH_VIZ;
        let yCPix = yC*HEIGHT_VIZ;

        //// when the radius exceeds this value reset the shape
        if(age>1.0 || rad>0.2) {
            age = 0.0;
            rad = 0.0;
            alpha = 1.0;
            xC = getRandomFloat(-0.2,1.0);
            yC = getRandomFloat(-0.2,1.0);
            aspect = 1.0;
        }

        let rPixX = val*WIDTH_VIZ*rad*rMax;

        let rPixY = rPixX*aspect;

        // console.log("rPix",rPix)


        //// draw circle
        ctx.fillStyle =   "hsl(200, 50%, 60%, " + alpha + ")";
        ctx.strokeStyle = "hsl(200, 50%, 60%, " + alpha + ")";
        ctx.lineWidth = getRandomFloat(1.0,4.0);

        //// background
        // ctx.beginPath();
        // ctx.rect(0, 0, WIDTH, HEIGHT);
        // ctx.fill();

        ctx.beginPath();
        ctx.ellipse(xCPix, yCPix, rPixX, rPixY, 0, 0, twoPI);
        // ctx.stroke();
        ctx.fill();

        shape.rad = rad;
        shape.age = age;
        shape.alpha = alpha;
        shape.xC = xC;
        shape.yC = yC;
        // shape.aspect = aspect;
        SHAPES[i] = shape; // update shape

    }


}








function drawVisualizer01(canvas,val0) {

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let val = Math.tanh((val0+0.4)*4.0);

    let nShapes = 12;

    let rMax = 0.4 * vizCall/vizCallMax;

    let alpha = 0.5 * (1 - vizCall/vizCallMax);

    vizCall = vizCall + 1;

    if(vizCall>32) {

        vizCall = 0; // reset vizCall

        for(let i=0; i<nShapes; i++) {
            let xC = getRandomInt(0, WIDTH_VIZ);
            let yC = getRandomInt(0, HEIGHT_VIZ);
            xC_arr[i] = xC;
            yC_arr[i] = yC;
            rMaxThis_arr[i] = getRandomFloat(0.1,1.0);
        }

    }

    // console.log("vizCall",vizCall)
    
    for(let i=0; i<nShapes; i++) {
        
        let rPix = val*HEIGHT_VIZ*rMaxThis_arr[i]*rMax;




        // get context and clear for new drawing



        //// draw circle
        ctx.fillStyle = "hsl(200, 50%, 60%, " + alpha + ")";
        ctx.strokeStyle = "hsl(200, 50%, 60%, 0.5)";
        ctx.lineWidth = getRandomFloat(1.0,4.0);

        //// background
        // ctx.beginPath();
        // ctx.rect(0, 0, WIDTH, HEIGHT);
        // ctx.fill();

        ctx.beginPath();
        ctx.ellipse(xC_arr[i], yC_arr[i], rPix, rPix, 0, 0, twoPI);
        // ctx.stroke();
        ctx.fill();

    }


}