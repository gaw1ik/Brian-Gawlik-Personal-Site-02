// GLOBAL VARS
device = {};

mobileCutoff = 800;
myrng = new Math.seedrandom();

onePI = Math.PI; 
twoPI = Math.PI * 2;
PIo2  = Math.PI * 0.5;
PIo4  = Math.PI * 0.25;
PIo8  = Math.PI * 0.125;
PIo16 = Math.PI * 0.0625;

isToggled = false; 
isDragging = false;
isTouching = false;

themeIndex = 0;

PARAMS = {

    master_gain:0.8,
    master_LPF:0.737,
    chance:0.27,
    time:0.4,
    release:0.749,

}


window.addEventListener("load", setupCanvases); // commented this out bc setupCanvases() is already called in setup()

canvases = document.getElementsByClassName("dial");



setTheme();

function setTheme() {

    let themes = ['light','dark'];

    themeName = themes[themeIndex];


    // console.log(themeIndex)
    // console.log(themeName)


    const cssroot = document.documentElement;

    if(themeName=='light') {


        //////// JS
        //// KNOBS
        [hueKnobNeedle,satKnobNeedle,litKnobNeedle,alphaKnobNeedle] = [0, 0, 30, 0.5];
        [hueKnobBottom,satKnobBottom,litKnobBottom,alphaKnobBottom] = [200, 0, 40, 1.0];
        [hueKnobTop,satKnobTop,litKnobTop,alphaKnobTop] = [200, 50, 70, 1.0];
        [hueKnobShadow,satKnobShadow,litKnobShadow,alphaKnobShadow] = [0, 0, 0, 0.10];

        //////// CSS
        [hueBG, satBG, litBG] =  [190,100,92];
        let hslBG = "hsl(" + hueBG + ", " + satBG + "%, " + litBG + "%)";
        cssroot.style.setProperty('--bg-hsl', hslBG);
        cssroot.style.setProperty('--text-color-body', 'hsl(0,0%,10%)');
        cssroot.style.setProperty('--text-color-h1','hsl(0,0%,10%)');
        cssroot.style.setProperty('--controlsContainer01-hsl','hsl(205, 90%, 70%, 0.1)');

    } else if (themeName=='dark') {

        //////// JS
        //// KNOBS
        [hueKnobNeedle,satKnobNeedle,litKnobNeedle,alphaKnobNeedle] = [0, 0, 90, 0.5];
        [hueKnobBottom,satKnobBottom,litKnobBottom,alphaKnobBottom] = [200, 0, 20, 1.0];
        [hueKnobTop,satKnobTop,litKnobTop,alphaKnobTop] = [200, 50, 26, 1.0];
        [hueKnobShadow,satKnobShadow,litKnobShadow,alphaKnobShadow] = [0, 0, 0, 0.13];

        //////// CSS
        [hueBG, satBG, litBG] =  [210,30,15];
        let hslBG = "hsl(" + hueBG + ", " + satBG + "%, " + litBG + "%)";
        cssroot.style.setProperty('--bg-hsl', hslBG);
        cssroot.style.setProperty('--text-color-body', 'hsl(0,0%,90%)');
        cssroot.style.setProperty('--text-color-h1','hsl(0,0%,90%)');
        cssroot.style.setProperty('--controlsContainer01-hsl','hsl(205, 50%, 60%, 0.1)');

    }

    handleResize();

    // draw_canvasSetTheme();

    themeIndex = (themeIndex + 1) % 2;



}



document.body.addEventListener("click",playSound);



// window.addEventListener("load", setupCanvases); // commented this out bc setupCanvases() is already called in setup()


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

    document.body.removeEventListener("click",playSound);

    for(let i=0; i<canvases.length; i++) {
        canvases[i].removeEventListener('mousedown', playSound);
        canvases[i].removeEventListener('touchstart', playSound);

    }

    setup();

};




async function setup() {

    const patchExportURL = "export/patch.export.json";


    
    
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
    device;
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


    // Let's assume this exists in our patcher
    // const param_monosynth1note = device.parametersById.get("monosynth1note");

    // const param_rms = device.parametersById.get("rms");

    // device.parametersById.get("test3").value = 1;




    // With ParameterNotificationSetting.All, the device AND the parameter emit an event when we change the value
    // param_monosynth1note.changeEvent.subscribe((v) => {
    //     // console.log(`ChangeEvent: ${v}`);
    //     // vizCall = vizCallMax; // this resets the viz
    // });






    let canvases = document.getElementsByClassName("dial");
    for(let i=0; i<canvases.length; i++) {
        canvases[i].style.cursor="grab";
    }

    for(let i=0; i<canvases.length; i++) {

        let canvas = canvases[i];

        canvas.addEventListener('mousedown', (event) => {
            
            isDragging = true;
            // console.log("isDragging",isDragging)

            // lastX = event.clientX - canvas.offsetLeft;
            // lastY = event.clientY - canvas.offsetTop;
            lastX = event.clientX;
            lastY = event.clientY;
            //thisCanvasOffsetLeft = canvas.offsetLeft
            //thisCanvasOffsetTop = canvas.offsetTop
            activeCanvasID = event.target.id;
            // activeCanvasNum = activeCanvasID.substr(6,1) - 1; // index of the current active canvas (0,1,2,3,etc)
            console.log("event.target.id",event.target.id);
            let canvases = document.getElementsByClassName("dial");
            for(let i=0; i<canvases.length; i++) {
                canvases[i].style.cursor="grabbing";
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.cursor = "default";
            let canvases = document.getElementsByClassName("dial");
            for(let i=0; i<canvases.length; i++) {
                canvases[i].style.cursor="grab";
            }
            // console.log("isDragging",isDragging)

        });


        canvas.addEventListener('touchstart', (event) => {
            
            isTouching = true;
            console.log("touchstart")

            const touch = event.touches[0];
            lastX = touch.clientX;
            lastY = touch.clientY;
            // thisCanvasOffsetLeft = canvas.offsetLeft
            // thisCanvasOffsetTop = canvas.offsetTop
            activeCanvasID = event.target.id;
            activeCanvasNum = activeCanvasID.substr(6,1) - 1; // index of the current active canvas (0,1,2,3,etc)
            console.log("event.target.id",event.target.id);
        });

        document.addEventListener('touchend', () => {
            console.log("touchend")
            isTouching = false;
            // lastY[activeCanvasNum] = 0; // reset lastY back to 0
            // console.log("isDragging",isDragging)

        });
    }
    
    

    
    
    // console.log("hi")



    // muteControl.addEventListener('click', (event) => {

    //     currentMuteState = 1 - currentMuteState; 
    //     console.log("currentMuteState",currentMuteState);
    //     gainNode.gain.setValueAtTime(currentMuteState, context.currentTime);
    //     drawToggle(muteControl,currentMuteState);
    //     // device.parametersById.get("test3").value = getRandomFloat();


    // });





    // muteControl.addEventListener("touchstart", (event) => {

    //     event.preventDefault();

    //     isToggled = !isToggled; 

    //     currentMuteState = 1 - currentMuteState; 
    //     console.log("currentMuteState (touched)",currentMuteState);
    //     gainNode.gain.setValueAtTime(currentMuteState, context.currentTime);
    //     drawToggle(muteControl,currentMuteState);

    // }); 


    // ///////// INITIAL PARAMETER SETTING
    setupParams();



}






// canvases = document.getElementsByClassName("dial");
for(let i=0; i<canvases.length; i++) {
    canvases[i].style.cursor="grab";
    canvases[i].addEventListener('mousedown', playSound);
    canvases[i].addEventListener('touchstart', playSound);

}

// let blankControlCanvases = document.getElementsByClassName("blankControlCanvas");




//////////////////////////////////////////////////////////////////////////////////////////////// ASSIGN EVENT LISTENERS
for(let i=0; i<canvases.length; i++) {

    let canvas = canvases[i];

    canvas.addEventListener('mousedown', (event) => {
        
        isDragging = true;

        lastX = event.clientX;
        lastY = event.clientY;

        activeCanvasID = event.target.id;
        activeCanvasName = get_activeCanvasName(activeCanvasID);
        // console.log("event.target.id",event.target.id);
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
        // console.log("event.target.id",event.target.id);
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

        const x = event.clientX;
        const y = event.clientY;

        let dy = y - lastY;

        let v = PARAMS[activeCanvasName] - dy*0.007;

        val = Math.min(Math.max(0,v),1);

        PARAMS[activeCanvasName] = val;

        let canvas = document.getElementById(activeCanvasID);

        let funcName = "updateRNBOPARAM_"+ activeCanvasName;
        window[funcName](); // run the assign function corresponding to the active parameter
        
        // if(activeCanvasNum==0) {
        //     drawKnobDrive(canvas,val);
        // } else {
            drawKnob(canvas,val);
        // }            

        lastY = y;

    });

    document.addEventListener('touchmove', (event) => {

        if (!isDragging) return;
        document.body.style.cursor = "grabbing";

        const touch = event.touches[0]; // Get the first touch point

        const x = touch.clientX;
        const y = touch.clientY;

        let dy = y - lastY;

        let v = PARAMS[activeCanvasName] - dy*0.007;

        val = Math.min(Math.max(0,v),1);

        PARAMS[activeCanvasName] = val;

        let canvas = document.getElementById(activeCanvasID);

        let funcName = "updateRNBOPARAM_"+ activeCanvasName;
        window[funcName](); // run the assign function corresponding to the active parameter
        
        // if(activeCanvasNum==0) {
        //     drawKnobDrive(canvas,val);
        // } else {
            drawKnob(canvas,val);
        // }            

        lastY = y;

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




window.addEventListener("resize",handleResize);










