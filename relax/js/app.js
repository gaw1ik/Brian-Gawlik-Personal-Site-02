
document.body.addEventListener('click', playSound) ;

async function silenceTrick() {
    el = document.createElement( 'audio' );
    el.id = "silence";
    el.loop = true;
    el.src = 'silence.mp3'; // media file with tiny bit of silence
    el.volume = 0.2;
    el.play();
    console.log("silence playing")
}

window.addEventListener("load", setupCanvases); // commented this out bc setupCanvases() is already called in setup()

    
async function playSound() {


    await silenceTrick();
    

    // Create AudioContext
    WAContext = window.AudioContext || window.webkitAudioContext; // const
    context = new WAContext(); // const

    // Create gain node and connect it to audio output
    outputNode = context.createGain(); // const
    outputNode.connect(context.destination);

    document.getElementById("clickMessage").textContent = "";
    context.resume();

    document.body.removeEventListener('click', playSound);


    setup();

};





async function setup() {
    const patchExportURL = "export/patch.export.json";





    



    // document.body.onclick = () => {
    //     document.getElementById("titleHeader").textContent = "Relax";
    //     // outputNode.connect(context.destination);
    //     context.resume();
    // }






    // window.addEventListener('touchstart', playSoundIOS) 
    
    // function playSoundIOS() {
    
    //     document.getElementById("titleHeader").textContent = "Relax";
    //     context.resume();
    //     window.removeEventListener('touchstart', playSoundIOS);

    // };



    
    
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
        // console.log(`ChangeEvent: ${v}`);
        // vizCall = vizCallMax; // this resets the viz
    });

    param_rms.changeEvent.subscribe((v) => {
        // console.log(`RMS: ${v}`);
        drawVisualizer(canvasViz01,v);
    });

    // device.parameterChangeEvent.subscribe((v) => {
    //     console.log(`ParameterChangeEvent: ${v}`);
    // });






    // // Skip if you're not using guardrails.js
    // if (typeof guardrails === "function")
    //     guardrails();


    // setupCanvases(device);


        ///////// INITIAL PARAMETER SETTING
        const param_gain = device.parametersById.get("gain");
        param_gain.value = VAL[0]*157.0;
    
        const param_prob = device.parametersById.get("prob");
        param_prob.value = VAL[1]*60;
    
        const param_time = device.parametersById.get("time");
        param_time.value = 100 + VAL[2]*(4000-100);

        const param_curve = device.parametersById.get("curve");
        param_curve.value = -0.90 + VAL[3]*(32 - -0.90);

        isDragging = false;


        document.addEventListener('mousemove', (event) => {

            // console.log("isDragging",isDragging)
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
            console.log("gain",param_gain.value);
    
            const param_prob = device.parametersById.get("prob");
            param_prob.value = VAL[1]*60;
            console.log("prob",param_prob.value);
    
            const param_time = device.parametersById.get("time");
            param_time.value = 100 + VAL[2]*(4000-100);
            console.log("time",param_time.value);

            const param_curve = device.parametersById.get("curve");
            param_curve.value = -0.90 + VAL[3]*(32 - -0.90);
            console.log("release",param_curve.value);
            // param_time.value = 100 + VAL[2]*(4000-100);
    
            drawKnob(canvas,val);
    
            lastY = y;
            LASTY[activeCanvasNum] = lastY;
            // console.log("LASTY",LASTY);
    
        });
        
    
    
    
    
        // console.log("hi")
    
        muteControl.addEventListener('click', (event) => {
    
            currentMuteState = 1 - currentMuteState; 
            console.log("currentMuteState",currentMuteState);
            outputNode.gain.setValueAtTime(currentMuteState, context.currentTime);
            drawToggle(muteControl,currentMuteState);
    
        });
    
    
    
    
        let isToggled = false; 
    
        muteControl.addEventListener("touchstart", (event) => {
    
            event.preventDefault();
    
            isToggled = !isToggled; 
    
            currentMuteState = 1 - currentMuteState; 
            console.log("currentMuteState (touched)",currentMuteState);
            outputNode.gain.setValueAtTime(currentMuteState, context.currentTime);
            drawToggle(muteControl,currentMuteState);
    
        }); 






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

    window_innerWidth = window.innerWidth;
    window_innerHeight = window.innerHeight;


    ////////// Visualizer Canvas
    WIDTHSTYLE_VIZ = window_innerWidth;
    HEIGHTSTYLE_VIZ = window_innerHeight;
    WIDTH_VIZ = WIDTHSTYLE_VIZ*2;
    HEIGHT_VIZ = HEIGHTSTYLE_VIZ*2;

    canvasViz01.width = WIDTH_VIZ;
    canvasViz01.height = HEIGHT_VIZ;
    canvasViz01.style.width = WIDTHSTYLE_VIZ.toString() + "px";
    canvasViz01.style.height = HEIGHTSTYLE_VIZ.toString() + "px";



    ////////// Control Canvases
    if( window_innerHeight/window_innerWidth < 1 ) {
        HEIGHTSTYLE = window_innerHeight*0.15;
        WIDTHSTYLE = HEIGHTSTYLE;
    } else {
        WIDTHSTYLE = window_innerWidth*0.2;
        HEIGHTSTYLE = WIDTHSTYLE;
    }

    WIDTH = WIDTHSTYLE*2;
    HEIGHT = HEIGHTSTYLE*2;

    for(let i=0; i<CANVAS.length; i++) {
        let canvas = CANVAS[i];
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        canvas.style.width = WIDTHSTYLE.toString() + "px";
        canvas.style.height = HEIGHTSTYLE.toString() + "px";
        drawKnob(canvas,VAL[i]);
    }

    ////////// Mute Control Canvas
    muteControl.width = WIDTH;
    muteControl.height = HEIGHT;
    muteControl.style.width = WIDTHSTYLE.toString() + "px";
    muteControl.style.height = HEIGHTSTYLE.toString() + "px";

    drawToggle(muteControl,currentMuteState);




}



// window.addEventListener("load", setupCanvases); // commented this out bc setupCanvases() is already called in setup()

// window.addEventListener("DOMContentLoaded", silenceTrick);    



function setupCanvases() {

    


    console.log("window loaded")

    myrng = new Math.seedrandom();

    onePI = Math.PI; 
    twoPI = Math.PI * 2;
    PIo2  = Math.PI * 0.5;
    PIo4  = Math.PI * 0.25;
    PIo8  = Math.PI * 0.125;
    PIo16 = Math.PI * 0.0625;


    // INITIAL STATE VALUES
    currentMuteState = 1;
    VAL = [0.75,0.15,0.03,0.1]; // Initial Param Values
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

    // WIDTHSTYLE = window.innerWidth*0.1;
    // HEIGHTSTYLE = WIDTHSTYLE;
    // WIDTH = WIDTHSTYLE*2;
    // HEIGHT = HEIGHTSTYLE*2;



    canvas1 = document.getElementById("canvas1");
    canvas2 = document.getElementById("canvas2");
    canvas3 = document.getElementById("canvas3");
    canvas4 = document.getElementById("canvas4");

    CANVAS = [canvas1,canvas2,canvas3,canvas4];



    // /////////////////////////// INITIALIZE MUTE CONTROL SIZE
    muteControl = document.getElementById("mute");



    handleResize();

    // ////////// Visualizer Canvas
    // canvasViz01 = document.getElementById("canvasViz01");
    // WIDTHSTYLE_VIZ = window.innerWidth;
    // HEIGHTSTYLE_VIZ = window.innerHeight;
    // WIDTH_VIZ = WIDTHSTYLE_VIZ*2;
    // HEIGHT_VIZ = HEIGHTSTYLE_VIZ*2;

    // canvasViz01.width = WIDTH_VIZ;
    // canvasViz01.height = HEIGHT_VIZ;
    // canvasViz01.style.width = WIDTHSTYLE_VIZ.toString() + "px";
    // canvasViz01.style.height = HEIGHTSTYLE_VIZ.toString() + "px";









    // let startX, startY;



    for(let i=0; i<CANVAS.length; i++) {

        let canvas = CANVAS[i];

        canvas.addEventListener('mousedown', (event) => {
            
            isDragging = true;
            // console.log("isDragging",isDragging)

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
            // console.log("isDragging",isDragging)

        });
    }
    
    





    // param_time.value = 100 + VAL[2]*(4000-100);

    // drawKnob(canvas2,VAL[1]);
    // drawKnob(canvas3,VAL[1]);
    // // drawKnob(canvas3,VAL[2]);
    // drawKnob(canvas4,VAL[3]);



}






// setup();
