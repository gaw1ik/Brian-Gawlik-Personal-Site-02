async function setup() {
    const patchExportURL = "export/patch.export.json";

    // Create AudioContext
    WAContext = window.AudioContext || window.webkitAudioContext; // const
    context = new WAContext(); // const

    // Create gain node and connect it to audio output
    outputNode = context.createGain(); // const
    outputNode.connect(context.destination);

    
    
    // Fetch the exported patcher
    let response, patcher;
    try {
        response = await fetch(patchExportURL);
        patcher = await response.json();
    
        if (!window.RNBO) {
            // Load RNBO script dynamically
            // Note that you can skip this by knowing the RNBO version of your patch
            // beforehand and just include it using a <script> tag
            await loadRNBOScript(patcher.desc.meta.rnboversion);
        }

    } catch (err) {
        const errorContext = {
            error: err
        };
        if (response && (response.status >= 300 || response.status < 200)) {
            errorContext.header = `Couldn't load patcher export bundle`,
            errorContext.description = `Check app.js to see what file it's trying to load. Currently it's` +
            ` trying to load "${patchExportURL}". If that doesn't` + 
            ` match the name of the file you exported from RNBO, modify` + 
            ` patchExportURL in app.js.`;
        }
        if (typeof guardrails === "function") {
            guardrails(errorContext);
        } else {
            throw err;
        }
        return;
    }
    
    // (Optional) Fetch the dependencies
    let dependencies = [];
    try {
        const dependenciesResponse = await fetch("export/dependencies.json");
        dependencies = await dependenciesResponse.json();

        // Prepend "export" to any file dependenciies
        dependencies = dependencies.map(d => d.file ? Object.assign({}, d, { file: "export/" + d.file }) : d);
    } catch (e) {}

    // Create the device
    let device;
    try {
        device = await RNBO.createDevice({ context, patcher });
    } catch (err) {
        if (typeof guardrails === "function") {
            guardrails({ error: err });
        } else {
            throw err;
        }
        return;
    }

    // (Optional) Load the samples
    if (dependencies.length)
        await device.loadDataBufferDependencies(dependencies);

    // Connect the device to the web audio graph
    device.node.connect(outputNode);


    // Let's assume this exists in our patcher
    const param_monosynth1note = device.parametersById.get("monosynth1note");

    const param_rms = device.parametersById.get("rms");


    // With ParameterNotificationSetting.All, the device AND the parameter emit an event when we change the value
    param_monosynth1note.changeEvent.subscribe((v) => {
        console.log(`ChangeEvent: ${v}`);
        // vizCall = vizCallMax; // this resets the viz
    });

    param_rms.changeEvent.subscribe((v) => {
        // console.log(`RMS: ${v}`);
        drawVisualizer(canvasViz01,v);
    });

    // device.parameterChangeEvent.subscribe((v) => {
    //     console.log(`ParameterChangeEvent: ${v}`);
    // });


    document.body.onclick = () => {
        context.resume();
    }

    window.addEventListener('touchstart',() => {
            context.resume();
            outputNode.gain.setValueAtTime(1, context.currentTime);
        }
    )

    // // Skip if you're not using guardrails.js
    // if (typeof guardrails === "function")
    //     guardrails();


    setupCanvases(device);






}

function loadRNBOScript(version) {
    return new Promise((resolve, reject) => {
        if (/^\d+\.\d+\.\d+-dev$/.test(version)) {
            throw new Error("Patcher exported with a Debug Version!\nPlease specify the correct RNBO version to use in the code.");
        }
        const el = document.createElement("script");
        el.src = "https://c74-public.nyc3.digitaloceanspaces.com/rnbo/" + encodeURIComponent(version) + "/rnbo.min.js";
        el.onload = resolve;
        el.onerror = function(err) {
            console.log(err);
            reject(new Error("Failed to load rnbo.js v" + version));
        };
        document.body.append(el);
    });
}




window.addEventListener("resize",handleResize);

function handleResize() {
    ////////// Visualizer Canvas
    canvasViz01 = document.getElementById("canvasViz01");
    WIDTHSTYLE_VIZ = window.innerWidth;
    HEIGHTSTYLE_VIZ = window.innerHeight;
    WIDTH_VIZ = WIDTHSTYLE_VIZ*2;
    HEIGHT_VIZ = HEIGHTSTYLE_VIZ*2;

    canvasViz01.width = WIDTH_VIZ;
    canvasViz01.height = HEIGHT_VIZ;
    canvasViz01.style.width = WIDTHSTYLE_VIZ.toString() + "px";
    canvasViz01.style.height = HEIGHTSTYLE_VIZ.toString() + "px";
}



window.addEventListener("load", setupCanvases);


function setupCanvases(device) {

    console.log("window loaded")

    myrng = new Math.seedrandom();

    onePI = Math.PI; 
    twoPI = Math.PI * 2;
    PIo2  = Math.PI * 0.5;
    PIo4  = Math.PI * 0.25;
    PIo8  = Math.PI * 0.125;
    PIo16 = Math.PI * 0.0625;

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


    WIDTHSTYLE = 150;
    HEIGHTSTYLE = 150;
    WIDTH = WIDTHSTYLE*2;
    HEIGHT = HEIGHTSTYLE*2;



    canvas1 = document.getElementById("canvas1");
    canvas2 = document.getElementById("canvas2");
    canvas3 = document.getElementById("canvas3");
    canvas4 = document.getElementById("canvas4");



    CANVAS = [canvas1,canvas2,canvas3,canvas4];

    for(let i=0; i<CANVAS.length; i++) {
        CANVAS[i].width = WIDTH;
        CANVAS[i].height = HEIGHT;
        CANVAS[i].style.width = WIDTHSTYLE.toString() + "px";
        CANVAS[i].style.height = HEIGHTSTYLE.toString() + "px";
        // canvasViz01.style.zindex = "1";

    }


    ////////// Visualizer Canvas
    canvasViz01 = document.getElementById("canvasViz01");
    WIDTHSTYLE_VIZ = window.innerWidth;
    HEIGHTSTYLE_VIZ = window.innerHeight;
    WIDTH_VIZ = WIDTHSTYLE_VIZ*2;
    HEIGHT_VIZ = HEIGHTSTYLE_VIZ*2;

    canvasViz01.width = WIDTH_VIZ;
    canvasViz01.height = HEIGHT_VIZ;
    canvasViz01.style.width = WIDTHSTYLE_VIZ.toString() + "px";
    canvasViz01.style.height = HEIGHTSTYLE_VIZ.toString() + "px";









    let isDragging = false;
    // let startX, startY;

    VAL = [0.75,0.05,0.0,0.0]; // Initial Param Values
    LASTY = [0,0,0,0];

    for(let i=0; i<CANVAS.length; i++) {

        let canvas = CANVAS[i];

        canvas.addEventListener('mousedown', (event) => {
            
            isDragging = true;
            lastX = event.clientX - canvas.offsetLeft;
            lastY = event.clientY - canvas.offsetTop;
            thisCanvasOffsetLeft = canvas.offsetLeft
            thisCanvasOffsetTop = canvas.offsetTop
            activeCanvasID = event.target.id;
            activeCanvasNum = activeCanvasID.substr(6,1) - 1; // index of the current active canvas (0,1,2,3,etc)
            console.log("event.target.id",event.target.id);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
    
    
    
    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        // startX = lastX;
        // lastY = startY;

        const x = event.clientX - thisCanvasOffsetLeft;
        const y = event.clientY - thisCanvasOffsetTop;

        // calculate delta movements

        let dy = y - lastY;
        //dx = startX - x;
        //dxy = dy+dx;

        let v = VAL[activeCanvasNum] - dy*0.007;

        val = Math.min(Math.max(0,v),1);

        VAL[activeCanvasNum] = val;

        // console.log("VAL",VAL);

        let canvas = document.getElementById(activeCanvasID);

        // // Listen to parameter changes from the device
        // device.parameterChangeEvent.subscribe(param => {
        //     if (!isDraggingSlider)
        //         uiElements[param.id].slider.value = param.value;
        //         uiElements[param.id].text.value = param.value.toFixed(1);
        // });

                // param is of type Parameter
        // const param = device.parametersById.get("gain");
        // param.value = VAL[0]*157.0;
        const param_gain = device.parametersById.get("gain");
        param_gain.value = VAL[0]*157.0;

        const param_prob = device.parametersById.get("prob");
        param_prob.value = VAL[1]*60;

        const param_time = device.parametersById.get("time");
        param_time.value = 100 + VAL[2]*(4000-100);
        // param_time.value = 100 + VAL[2]*(4000-100);

        drawKnob(canvas,val);

        lastY = y;
        LASTY[activeCanvasNum] = lastY;
        // console.log("LASTY",LASTY);

    });
    




    ///////// INITIAL PARAMETER SETTING
    const param_gain = device.parametersById.get("gain");
    param_gain.value = VAL[0]*157.0;

    const param_prob = device.parametersById.get("prob");
    param_prob.value = VAL[1]*60;

    const param_time = device.parametersById.get("time");
    param_time.value = 100 + VAL[2]*(4000-100);
    // param_time.value = 100 + VAL[2]*(4000-100);

    drawKnob(canvas1,VAL[0]);
    drawKnob(canvas2,VAL[1]);
    drawKnob(canvas3,VAL[1]);
    // drawKnob(canvas3,VAL[2]);
    drawKnob(canvas4,VAL[3]);



}






setup();
