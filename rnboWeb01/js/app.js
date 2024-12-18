async function setup() {
    const patchExportURL = "export/patch.export.json";

    // Create AudioContext
    const WAContext = window.AudioContext || window.webkitAudioContext;
    const context = new WAContext();

    // Create gain node and connect it to audio output
    const outputNode = context.createGain();
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

    // (Optional) Extract the name and rnbo version of the patcher from the description
    // document.getElementById("patcher-title").innerText = (patcher.desc.meta.filename || "Unnamed Patcher") + " (v" + patcher.desc.meta.rnboversion + ")";

    // (Optional) Automatically create sliders for the device parameters
    //makeSliders(device);

    // (Optional) Create a form to send messages to RNBO inputs
    //makeInportForm(device);

    // (Optional) Attach listeners to outports so you can log messages from the RNBO patcher
    //attachOutports(device);

    // (Optional) Load presets, if any
    //loadPresets(device, patcher);

    // (Optional) Connect MIDI inputs
    //makeMIDIKeyboard(device);

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

// function makeSliders(device) {
//     let pdiv = document.getElementById("rnbo-parameter-sliders");
//     let noParamLabel = document.getElementById("no-param-label");
//     if (noParamLabel && device.numParameters > 0) pdiv.removeChild(noParamLabel);

//     // This will allow us to ignore parameter update events while dragging the slider.
//     let isDraggingSlider = false;
//     let uiElements = {};

//     device.parameters.forEach(param => {
//         // Subpatchers also have params. If we want to expose top-level
//         // params only, the best way to determine if a parameter is top level
//         // or not is to exclude parameters with a '/' in them.
//         // You can uncomment the following line if you don't want to include subpatcher params
        
//         //if (param.id.includes("/")) return;

//         // Create a label, an input slider and a value display
//         let label = document.createElement("label");
//         let slider = document.createElement("input");
//         let text = document.createElement("input");
//         let sliderContainer = document.createElement("div");
//         sliderContainer.appendChild(label);
//         sliderContainer.appendChild(slider);
//         sliderContainer.appendChild(text);

//         // Add a name for the label
//         label.setAttribute("name", param.name);
//         label.setAttribute("for", param.name);
//         label.setAttribute("class", "param-label");
//         label.textContent = `${param.name}: `;

//         // Make each slider reflect its parameter
//         slider.setAttribute("type", "range");
//         slider.setAttribute("class", "param-slider");
//         slider.setAttribute("id", param.id);
//         slider.setAttribute("name", param.name);
//         slider.setAttribute("min", param.min);
//         slider.setAttribute("max", param.max);
//         if (param.steps > 1) {
//             slider.setAttribute("step", (param.max - param.min) / (param.steps - 1));
//         } else {
//             slider.setAttribute("step", (param.max - param.min) / 1000.0);
//         }
//         slider.setAttribute("value", param.value);

//         // Make a settable text input display for the value
//         text.setAttribute("value", param.value.toFixed(1));
//         text.setAttribute("type", "text");

//         // Make each slider control its parameter
//         slider.addEventListener("pointerdown", () => {
//             isDraggingSlider = true;
//         });
//         slider.addEventListener("pointerup", () => {
//             isDraggingSlider = false;
//             slider.value = param.value;
//             text.value = param.value.toFixed(1);
//         });
//         slider.addEventListener("input", () => {
//             let value = Number.parseFloat(slider.value);
//             param.value = value;
//         });

//         // Make the text box input control the parameter value as well
//         text.addEventListener("keydown", (ev) => {
//             if (ev.key === "Enter") {
//                 let newValue = Number.parseFloat(text.value);
//                 if (isNaN(newValue)) {
//                     text.value = param.value;
//                 } else {
//                     newValue = Math.min(newValue, param.max);
//                     newValue = Math.max(newValue, param.min);
//                     text.value = newValue;
//                     param.value = newValue;
//                 }
//             }
//         });

//         // Store the slider and text by name so we can access them later
//         uiElements[param.id] = { slider, text };

//         // Add the slider element
//         pdiv.appendChild(sliderContainer);
//     });

//     // Listen to parameter changes from the device
//     device.parameterChangeEvent.subscribe(param => {
//         if (!isDraggingSlider)
//             uiElements[param.id].slider.value = param.value;
//             uiElements[param.id].text.value = param.value.toFixed(1);
//     });
// }

// function makeInportForm(device) {
//     const idiv = document.getElementById("rnbo-inports");
//     const inportSelect = document.getElementById("inport-select");
//     const inportText = document.getElementById("inport-text");
//     const inportForm = document.getElementById("inport-form");
//     let inportTag = null;
    
//     // Device messages correspond to inlets/outlets or inports/outports
//     // You can filter for one or the other using the "type" of the message
//     const messages = device.messages;
//     const inports = messages.filter(message => message.type === RNBO.MessagePortType.Inport);

//     if (inports.length === 0) {
//         idiv.removeChild(document.getElementById("inport-form"));
//         return;
//     } else {
//         idiv.removeChild(document.getElementById("no-inports-label"));
//         inports.forEach(inport => {
//             const option = document.createElement("option");
//             option.innerText = inport.tag;
//             inportSelect.appendChild(option);
//         });
//         inportSelect.onchange = () => inportTag = inportSelect.value;
//         inportTag = inportSelect.value;

//         inportForm.onsubmit = (ev) => {
//             // Do this or else the page will reload
//             ev.preventDefault();

//             // Turn the text into a list of numbers (RNBO messages must be numbers, not text)
//             const values = inportText.value.split(/\s+/).map(s => parseFloat(s));
            
//             // Send the message event to the RNBO device
//             let messageEvent = new RNBO.MessageEvent(RNBO.TimeNow, inportTag, values);
//             device.scheduleEvent(messageEvent);
//         }
//     }
// }

// function attachOutports(device) {
//     const outports = device.outports;
//     if (outports.length < 1) {
//         document.getElementById("rnbo-console").removeChild(document.getElementById("rnbo-console-div"));
//         return;
//     }

//     document.getElementById("rnbo-console").removeChild(document.getElementById("no-outports-label"));
//     device.messageEvent.subscribe((ev) => {

//         // Ignore message events that don't belong to an outport
//         if (outports.findIndex(elt => elt.tag === ev.tag) < 0) return;

//         // Message events have a tag as well as a payload
//         console.log(`${ev.tag}: ${ev.payload}`);

//         document.getElementById("rnbo-console-readout").innerText = `${ev.tag}: ${ev.payload}`;
//     });
// }

// function loadPresets(device, patcher) {
//     let presets = patcher.presets || [];
//     if (presets.length < 1) {
//         document.getElementById("rnbo-presets").removeChild(document.getElementById("preset-select"));
//         return;
//     }

//     document.getElementById("rnbo-presets").removeChild(document.getElementById("no-presets-label"));
//     let presetSelect = document.getElementById("preset-select");
//     presets.forEach((preset, index) => {
//         const option = document.createElement("option");
//         option.innerText = preset.name;
//         option.value = index;
//         presetSelect.appendChild(option);
//     });
//     presetSelect.onchange = () => device.setPreset(presets[presetSelect.value].preset);
// }

// function makeMIDIKeyboard(device) {
//     let mdiv = document.getElementById("rnbo-clickable-keyboard");
//     if (device.numMIDIInputPorts === 0) return;

//     mdiv.removeChild(document.getElementById("no-midi-label"));

//     const midiNotes = [49, 52, 56, 63];
//     midiNotes.forEach(note => {
//         const key = document.createElement("div");
//         const label = document.createElement("p");
//         label.textContent = note;
//         key.appendChild(label);
//         key.addEventListener("pointerdown", () => {
//             let midiChannel = 0;

//             // Format a MIDI message paylaod, this constructs a MIDI on event
//             let noteOnMessage = [
//                 144 + midiChannel, // Code for a note on: 10010000 & midi channel (0-15)
//                 note, // MIDI Note
//                 100 // MIDI Velocity
//             ];
        
//             let noteOffMessage = [
//                 128 + midiChannel, // Code for a note off: 10000000 & midi channel (0-15)
//                 note, // MIDI Note
//                 0 // MIDI Velocity
//             ];
        
//             // Including rnbo.min.js (or the unminified rnbo.js) will add the RNBO object
//             // to the global namespace. This includes the TimeNow constant as well as
//             // the MIDIEvent constructor.
//             let midiPort = 0;
//             let noteDurationMs = 250;
        
//             // When scheduling an event to occur in the future, use the current audio context time
//             // multiplied by 1000 (converting seconds to milliseconds) for now.
//             let noteOnEvent = new RNBO.MIDIEvent(device.context.currentTime * 1000, midiPort, noteOnMessage);
//             let noteOffEvent = new RNBO.MIDIEvent(device.context.currentTime * 1000 + noteDurationMs, midiPort, noteOffMessage);
        
//             device.scheduleEvent(noteOnEvent);
//             device.scheduleEvent(noteOffEvent);

//             key.classList.add("clicked");
//         });

//         key.addEventListener("pointerup", () => key.classList.remove("clicked"));

//         mdiv.appendChild(key);
//     });
// }






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
        let shape = {rad:0, xC:xC, yC:yC, aspect:aspect, alpha:1.0, speed:speed};
        SHAPES.push(shape);
        console.log(shape)
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
        param_prob.value = VAL[1]*100;

        const param_time = device.parametersById.get("time");
        param_time.value = 100 + VAL[2]*(8000-100);

        drawKnob(canvas,val);

        lastY = y;
        LASTY[activeCanvasNum] = lastY;
        // console.log("LASTY",LASTY);

    });
    





    const param_gain = device.parametersById.get("gain");
    param_gain.value = VAL[0]*157.0;

    const param_prob = device.parametersById.get("prob");
    param_prob.value = VAL[1]*100;

    const param_time = device.parametersById.get("time");
    param_time.value = 100 + VAL[2]*(4000-100);

    drawKnob(canvas1,VAL[0]);
    drawKnob(canvas2,VAL[1]);
    drawKnob(canvas3,VAL[2]);
    drawKnob(canvas4,VAL[3]);



}






setup();
