// GLOBAL VARS
// mobileCutoff = 800;
alphaUI2 = 0;
onePI = Math.PI; 
twoPI = Math.PI * 2;
PIo2  = Math.PI * 0.5;
PIo4  = Math.PI * 0.25;
PIo8  = Math.PI * 0.125;
PIo16 = Math.PI * 0.0625;
myrng = new Math.seedrandom();



device = {};
TIME = 800;
// [hueUI1,satUI1,litUI1] = [200,50,80];
// [hueUI2, satUI2, litUI2] = [0,0,0];
// [hueBG, satBG, litBG] =  [160,30,17];
// [hueWave1, satWave1, litWave1] =  [170,30,28];
// [hueWave2, satWave2, litWave2] =  [50,24,26];


//// ControlViz's
[hueUI1,satUI1,litUI1] = [200,0,10];
alphaUI1 = 255;
[hueUI2, satUI2, litUI2] = [0,0,0];

//// VIZ
// [hueBG, satBG, litBG] =  [160,30,27];
// [hueBG, satBG, litBG] =  [40,40,20];
[hueBG, satBG, litBG] =  [150,20,50];

[hueWave1, satWave1, litWave1] =  [50,30,46];
// [hueWave2, satWave2, litWave2] =  [170,40,48];
[hueWave2, satWave2, litWave2] =  [170,100,90];
alphaWave1 = 255;

//// KNOBS
[hueKnobNeedle,satKnobNeedle,litKnobNeedle,alphaKnobNeedle] = [0,0,10,1.0];
[hueKnobBottom,satKnobBottom,litKnobBottom,alphaKnobBottom] = [0,0,4,1.0];
[hueKnobTop,satKnobTop,litKnobTop,alphaKnobTop] = [150, 15, 30, 1.0];


isDragging = false;
isTouching = false;

// CSS
const cssroot = document.documentElement;
let hslBG = "hsl(" + hueBG + ", " + satBG + "%, " + litBG + "%)";
cssroot.style.setProperty('--bg-hsl', hslBG);
cssroot.style.setProperty('--text-color-body', 'hsl(0,0%,10%)');
cssroot.style.setProperty('--text-color-h1','hsl(0,0%,10%)');
cssroot.style.setProperty('--controlsContainer01-bghsl','hsl(160, 50%, 70%, 0.2)');

// LIGHT
// [hueBG, satBG, litBG] =  [160,30,60];
// [hueUI1,satUI1,litUI1] = [200,50,10];

// document.body.style.color = "black";
// document.getElementById("titleHeader").style.color = "black";

////////////////////////////////////////////////////////////////// INITIALIZE VIZ SHAPES ARRAY
VIZ_SHAPES = [];
N_VIZ_SHAPES = 2;
let nSegs = 64;
let lw = 0.003;
let amplitude = 0.2;
let xSpan = 2.5;
let speed = PI/1000;
let alpha = alphaWave1;

// for(let i=0;i<N_VIZ_SHAPES;i++) {
shape = {
    lw: lw,
    // HSL: [hueWave1, satWave1, litWave1],
    alpha: alpha,
    phaseOffset: PIo2,
    Y0: 0.90,
    nSegs:nSegs,
    amplitude:amplitude,
    xSpan:xSpan,
    speed:speed,
    phase2:0,
}
VIZ_SHAPES.push(shape);

var shape = {
    lw: lw,
    // HSL: [hueWave1, satWave1, litWave1],
    alpha: alpha,
    phaseOffset: 0,
    Y0: 0.10,
    nSegs:nSegs,
    amplitude:amplitude,
    xSpan:xSpan,
    speed:speed*1.0,
    phase2:PIo2,
}
VIZ_SHAPES.push(shape);




window.addEventListener("load", setupCanvases); // commented this out bc setupCanvases() is already called in setup()


// window.scrollTo(0,1);




async function silenceTrick() {
    el = document.createElement( 'audio' );
    el.id = "silence";
    el.loop = true;
    el.src = 'silence.mp3'; // media file with tiny bit of silence
    el.volume = 0.2;
    el.play();
    console.log("silence playing")
}


    
async function playSound() {


    await silenceTrick();
    

    // Create AudioContext
    WAContext = window.AudioContext || window.webkitAudioContext; // const
    context = new WAContext(); // const

    const audioElementSource = context.createMediaElementSource(el);

    gainNode = context.createGain(); // const


    // Create gain node and connect it to audio output
    audioElementSource.connect(gainNode).connect(context.destination);
    // gainNode.connect(context.destination);


    // document.getElementById("clickMessage").textContent = "";
    context.resume();

    // document.body.removeEventListener('click', playSound);

    currentMuteState = 1 - currentMuteState; 
    console.log("currentMuteState",currentMuteState);
    gainNode.gain.setValueAtTime(currentMuteState, context.currentTime);
    // drawToggle(muteControl,currentMuteState,0);

    // document.getElementById("clickhereText").textContent = "ON";

    // muteControl.removeEventListener('click', playSound);
    document.body.removeEventListener('click', playSound);

    for(let i=0; i<canvases.length; i++) {
        canvases[i].style.cursor="grab";
        canvases[i].removeEventListener('mousedown', playSound);
    }




    setup();

};



















async function setup() {



    const patchExportURL = "export/new01.export.json";





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
    // let device;
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
    device.node.connect(gainNode);












    setInterval(draw_background_controlViz,34);

    setInterval(draw_wash_controlViz,34);

    RUSH_SHAPES = [];
    var shape = {
        phaseOffset:0,
    }
    RUSH_SHAPES.push(shape);
    setInterval(draw_rush_controlViz,34);

    INSECTS_SHAPES = [];
    for(let i=0;i<8;i++) {
        var shape = {
            xC:getRandomFloat(-1,1),
            yC:getRandomFloat(),
            rad:0.01,
        }
        INSECTS_SHAPES.push(shape);
    }
    setInterval(draw_insects_controlViz,34);

    setInterval(draw_birds_controlViz,34);
 


    // ///////// INITIAL PARAMETER SETTING
    setupParams();









    
    
    





}

document.body.addEventListener('click', playSound);




let canvases = document.getElementsByClassName("dial");
for(let i=0; i<canvases.length; i++) {
    canvases[i].style.cursor="grab";
    canvases[i].addEventListener('mousedown', playSound);
}

let blankControlCanvases = document.getElementsByClassName("blankControlCanvas");


for(let i=0; i<canvases.length; i++) {

    let canvas = canvases[i];

    canvas.addEventListener('mousedown', (event) => {
        
        isDragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        activeCanvasID = event.target.id;
        activeCanvasNum = activeCanvasID.substr(6,1) - 1; // index of the current active canvas (0,1,2,3,etc)
        activeCanvasName = get_activeCanvasName(activeCanvasID);
        console.log("event.target.id",event.target.id);
        for(let i=0; i<canvases.length; i++) {
            canvases[i].style.cursor="grabbing";
        }
    });

    canvas.addEventListener('touchstart', (event) => {

        isDragging = true;

        const touch = event.touches[0]; // Get the first touch point

        lastX = touch.clientX;
        lastY = touch.clientY;

        activeCanvasID = event.target.id;
        activeCanvasName = get_activeCanvasName(activeCanvasID);
        console.log("activeCanvasName",activeCanvasName)

        console.log("event.target.id",event.target.id);
        for(let i=0; i<canvases.length; i++) {
            canvases[i].style.cursor="grabbing";
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = "default";
        for(let i=0; i<canvases.length; i++) {
            canvases[i].style.cursor="grab";
        }

    });

    document.addEventListener('touchend', () => {
        isDragging = false;
        document.body.style.cursor = "default";
        for(let i=0; i<canvases.length; i++) {
            canvases[i].style.cursor="grab";
        }

    });

    document.addEventListener('mousemove', (event) => {

        if (!isDragging) return;
        document.body.style.cursor = "grabbing";
        // const x = event.clientX;
        const y = event.clientY;
        let dy = y - lastY;
        let v = PARAMS[activeCanvasName] - dy*0.007;
        val = Math.min(Math.max(0,v),1);
        PARAMS[activeCanvasName] = val;
        let canvas = document.getElementById(activeCanvasID);
        let funcName = "updateRNBOPARAM_"+ activeCanvasName;
        window[funcName](); // run the assign function corresponding to the active parameter     
        lastY = y;
        drawKnob(canvas,val);

    });

    document.addEventListener('touchmove', (event) => {

        if (!isDragging) return;
        const touch = event.touches[0]; // Get the first touch point
        const y = touch.clientY;
        document.body.style.cursor = "grabbing";
        let dy = y - lastY;
        let v = PARAMS[activeCanvasName] - dy*0.007;
        val = Math.min(Math.max(0,v),1);
        PARAMS[activeCanvasName] = val;
        let canvas = document.getElementById(activeCanvasID);
        let funcName = "updateRNBOPARAM_"+ activeCanvasName;
        window[funcName](); // run the assign function corresponding to the active parameter     
        lastY = y;

        drawKnob(canvas,val);


    });
}








function get_activeCanvasName(activeCanvasID) {
    let activeCanvasName = activeCanvasID.substr(7,activeCanvasID.len);
    return activeCanvasName;
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















