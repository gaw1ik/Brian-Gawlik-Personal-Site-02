
function setupParams() {

    for(let i=0; i<Object.keys(PARAMS).length; i++) {

        let paramName = Object.keys(PARAMS)[i];
        // console.log("paramName",paramName)
        // RRRRNBOPARAMS[paramName].value = PARAMS[paramName];
        let funcName = "updateRNBOPARAM_"+ paramName;
        window[funcName](); // run the assign function corresponding to the active parameter

        let canvas = document.getElementById("canvas_" + paramName)
        // console.log("PARAMS[paramName]",PARAMS[paramName])

        if(paramName==='onoff') {
            draw_onoff();
        } else {
            drawKnob(canvas,PARAMS[paramName]);
        }


    }

    //////// NON-UI PARAMS
    //// MASTER
    device.parametersById.get("master_hpf").value = 120;
    device.parametersById.get("master_monoToggle").value = 0;
    device.parametersById.get("master_noising").value = 0.002;
    device.parametersById.get("crackle_gain").value = 0.005;
    device.parametersById.get("pop_gain").value = 0.02;

    //// INSTRUMENTS
    device.parametersById.get("monoPluck01_oct").value = 0.125;
    device.parametersById.get("polyPluck01_oct").value = 1.0;

    device.parametersById.get("monoPluck01_gain").value = 0.7;
    device.parametersById.get("polyPluck01_gain").value = 1.0;

    device.parametersById.get("monoPluck01_pan").value = 0.5;
    device.parametersById.get("polyPluck01_pan").value = 0.5;

    device.parametersById.get("monoPluck01_lpf").value = 20000;
    device.parametersById.get("polyPluck01_lpf").value = 20000;

    // device.parametersById.get("monoPluck01_decayTime").value = 20000;
    // device.parametersById.get("polyPluck01_decayTime").value = 20000;

    device.parametersById.get("polyPluck01_interval").value = -1;

    device.parametersById.get("polyPluck01_flux").value = 0.004;
    device.parametersById.get("monoPluck01_flux").value = 0.004;



    //// NOISE
    // noise_gain = 0.01;

    device.parametersById.get("rush_pan").value = 0.5;
    device.parametersById.get("rush_flux").value = 0.1;
    device.parametersById.get("rush_lpf").value = 8000;
    device.parametersById.get("background_LPF").value = 2400;

    

 
    temp1 = 2;


    setInterval(changeOct,8000);

    function changeOct() {

        if(makeChoice(50)) {
            device.parametersById.get("polyPluck01_oct").value = 1.0;
            if(makeChoice(50)) {
                device.parametersById.get("monoPluck01_oct").value = 0.125;
            } else {
                device.parametersById.get("monoPluck01_oct").value = 0.250;
            }



        } else {
            device.parametersById.get("polyPluck01_oct").value = 0.5;
            device.parametersById.get("monoPluck01_oct").value = 0.125;
        }

        // console.log("[mp_oct,pp_oct]",[device.parametersById.get("monoPluck01_oct").value,device.parametersById.get("polyPluck01_oct").value]);

    }



}



function updateRNBOPARAM_master_gain() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.master_gain;
    let adjustedValue = calcParamValue(val,0,2,2);
    try{ device.parametersById.get("master_gain").value = adjustedValue } catch(error) {
    }
    let displayValue = adjustedValue*100;
    document.getElementById("canvasLabel_master_gain").textContent = "Volume (" + displayValue.toFixed(0) + ")";
}

function updateRNBOPARAM_master_lpf() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.master_lpf;
    let adjustedValue = calcParamValue(val,20,20000,4);
    try{ device.parametersById.get("master_lpf").value = adjustedValue } catch(error) {}
    document.getElementById("canvasLabel_master_lpf").textContent = "Tone (" + adjustedValue.toFixed(0) + " Hz)";
}

function updateRNBOPARAM_reverb_decay() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.reverb_decay;
    let adjustedValue = calcParamValue(val,50,100,1);
    try{ device.parametersById.get("master_reverb_gain").value = adjustedValue } catch(error) {}
    document.getElementById("canvasLabel_reverb_decay").textContent = "Reverb (" + adjustedValue.toFixed(0) + ")";
}






function updateRNBOPARAM_time() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.time;
    let adjustedValue = calcParamValue(val,100,2000,3);
    try{ device.parametersById.get("TIME").value = adjustedValue } catch(error) {}
    let adjustedValue2 = calcParamValue(val,0,1,4);
    try{ device.parametersById.get("TIMENORM").value = adjustedValue2 } catch(error) {}
    let displayedValue = adjustedValue;
    document.getElementById("canvasLabel_time").textContent = "Time (" + displayedValue.toFixed(0) + "ms)";
}

function updateRNBOPARAM_decay() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.decay;
    let adjustedValue = calcParamValue(1-val,0.01,24,2);
    try{ device.parametersById.get("monoPluck01_decayPow").value = adjustedValue } catch(error) {}
    try{ device.parametersById.get("polyPluck01_decayPow").value = adjustedValue } catch(error) {}

    let adjustedValue2 = calcParamValue(val,4000,20000,1.5);
    try{ device.parametersById.get("monoPluck01_decayTime").value = adjustedValue2 } catch(error) {}
    try{ device.parametersById.get("polyPluck01_decayTime").value = adjustedValue2 } catch(error) {}

    let displayedValue = 1 + (val)*99;
    document.getElementById("canvasLabel_decay").textContent = "Decay (" + displayedValue.toFixed(0) + ")";
}


function updateRNBOPARAM_hammer() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.hammer;
    let adjustedValue = calcParamValue(val,0,1,2);
    try{ device.parametersById.get("monoPluck01_hammer").value = adjustedValue } catch(error) {}
    try{ device.parametersById.get("polyPluck01_hammer").value = adjustedValue } catch(error) {} 
    try{ device.parametersById.get("monoPluck01_noise").value = adjustedValue*0.0005 } catch(error) {}
    try{ device.parametersById.get("polyPluck01_noise").value = adjustedValue*0.0005 } catch(error) {}     
    let displayedValue = val*100;
    document.getElementById("canvasLabel_hammer").textContent = "Hammer (" + displayedValue.toFixed(0) + ")";
}
// function updateRNBOPARAM_detune() {
//     // console.log("updateRNBOPARAM_background_gain")
//     let val = PARAMS.detune;
//     let adjustedValue = calcParamValue(val,0,0.04,1);
//     try{ device.parametersById.get("monoPluck01_flux").value = adjustedValue } catch(error) {}
//     try{ device.parametersById.get("polyPluck01_flux").value = adjustedValue } catch(error) {}    
//     let displayedValue = val*100;
//     document.getElementById("canvasLabel_detune").textContent = "Detune (" + displayedValue.toFixed(0) + ")";
// }

function updateRNBOPARAM_detune() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.detune;
    let adjustedValue = calcParamValue(val,0,0.008,2);
    try{ device.parametersById.get("rush_gain").value = adjustedValue } catch(error) {}
    try{ device.parametersById.get("background_gain").value = adjustedValue*10 } catch(error) {}  
    let displayedValue = val*100;
    document.getElementById("canvasLabel_detune").textContent = "Noise (" + displayedValue.toFixed(0) + ")";
}


function updateRNBOPARAM_Q() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.Q;
    let adjustedValue = calcParamValue(val,1000,40000,4);
    try{ device.parametersById.get("monoPluck01_Q").value = adjustedValue } catch(error) {}
    try{ device.parametersById.get("polyPluck01_Q").value = adjustedValue } catch(error) {}
    let displayedValue = adjustedValue;
    document.getElementById("canvasLabel_Q").textContent = "Q (" + displayedValue.toFixed(0) + ")";
}

function updateRNBOPARAM_harmonics() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.harmonics;
    let adjustedValue = calcParamValue(1-val,3,14,4);
    try{ device.parametersById.get("monoPluck01_harmPow").value = adjustedValue } catch(error) {}
    try{ device.parametersById.get("polyPluck01_harmPow").value = adjustedValue } catch(error) {}    let displayedValue = 1 + val*99;
    document.getElementById("canvasLabel_harmonics").textContent = "Harmonics (" + displayedValue.toFixed(0) + ")";
}


function updateRNBOPARAM_onoff() {
    let val = Number(PARAMS.onoff);
    try{ device.parametersById.get("patch_onoff").value = val } catch(error) {}

    console.log("PARAMS.onoff",val)

}








function calcParamValue(normalVal,min,max,pow) {

    let adjustedValue = min + (max-min)*normalVal**pow;

    return adjustedValue;

}