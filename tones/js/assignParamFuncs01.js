
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
    device.parametersById.get("master_monoToggle").value = 0;
    device.parametersById.get("master_cracklepop").value = 0.002;
    device.parametersById.get("master_LPF").value = 2000;

    // device.parametersById.get("reverb_decay").value = 96;
    // device.parametersById.get("reverb_damp").value = 0;
    // device.parametersById.get("glide").value = 100;



    //// INSTRUMENTS
    device.parametersById.get("wash_gain").value = 0.01;
    device.parametersById.get("bass01_gain").value = 0.50;
    device.parametersById.get("monosynth01_gain").value = 0.10;
    device.parametersById.get("polysynth01_gain").value = 0.04;







}



function updateRNBOPARAM_master_gain() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.master_gain;
    let adjustedValue = calcParamValue(val,0,1,2);
    try{ device.parametersById.get("master_gain").value = adjustedValue } catch(error) {
    }
    let displayValue = adjustedValue*100;
    document.getElementById("canvasLabel_master_gain").textContent = "Volume (" + displayValue.toFixed(0) + ")";
}

// function updateRNBOPARAM_master_LPF() {
//     // console.log("updateRNBOPARAM_background_gain")
//     let val = PARAMS.master_LPF;
//     let adjustedValue = calcParamValue(val,0,20000,6);
//     try{ device.parametersById.get("master_LPF").value = adjustedValue } catch(error) {}
//     document.getElementById("canvasLabel_master_LPF").textContent = "Filter (" + adjustedValue.toFixed(0) + " Hz)";
// }

function updateRNBOPARAM_chance() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.chance;
    let adjustedValue = calcParamValue(val,1,100,2);
    try{ device.parametersById.get("prob").value = adjustedValue } catch(error) {}
    document.getElementById("canvasLabel_chance").textContent = "Chance (" + adjustedValue.toFixed(0) + "%)";
}

function updateRNBOPARAM_time() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.time;
    let adjustedValue = calcParamValue(val,100,4000,2);
    try{ device.parametersById.get("time").value = adjustedValue } catch(error) {}
    document.getElementById("canvasLabel_time").textContent = "Time (" + adjustedValue.toFixed(0) + " ms)";
}

function updateRNBOPARAM_release() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.release;
    let adjustedValue = calcParamValue(val,100,4000,2);
    try{ device.parametersById.get("release").value = adjustedValue } catch(error) {}
        let displayedValue = adjustedValue;
    document.getElementById("canvasLabel_release").textContent = "Release (" + displayedValue.toFixed(0) + " ms)";
}

function updateRNBOPARAM_curve() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.curve;
    let adjustedValue = calcParamValue(val,-0.99,16,2);
    try{ device.parametersById.get("curve").value = adjustedValue } catch(error) {}
        let displayedValue = adjustedValue;
    document.getElementById("canvasLabel_curve").textContent = "Curve (" + displayedValue.toFixed(0) + ")";
}

function updateRNBOPARAM_glide() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.glide;
    let adjustedValue = calcParamValue(val,0,4000,2);
    try{ device.parametersById.get("glide").value = adjustedValue } catch(error) {}
        let displayedValue = adjustedValue;
    document.getElementById("canvasLabel_glide").textContent = "Glide (" + displayedValue.toFixed(0) + " ms)";
}

function updateRNBOPARAM_onoff() {
    let val = Number(PARAMS.onoff);
    try{ device.parametersById.get("onoff").value = val } catch(error) {}

    console.log("PARAMS.onoff",val)

}



function calcParamValue(normalVal,min,max,pow) {

    let adjustedValue = min + (max-min)*normalVal**pow;

    return adjustedValue;

}