
function setupParams() {

    for(let i=0; i<Object.keys(PARAMS).length; i++) {

        let paramName = Object.keys(PARAMS)[i];
        // console.log("paramName",paramName)
        // RRRRNBOPARAMS[paramName].value = PARAMS[paramName];
        let funcName = "updateRNBOPARAM_"+ paramName;
        window[funcName](); // run the assign function corresponding to the active parameter

        let canvas = document.getElementById("canvas_" + paramName)
        // console.log("PARAMS[paramName]",PARAMS[paramName])

        drawKnob(canvas,PARAMS[paramName]);

    }

    //////// NON-UI PARAMS
    //// MASTER
    device.parametersById.get("master_monoToggle").value = 0;
    device.parametersById.get("master_cracklepop").value = 0.002;
    device.parametersById.get("master_reverb").value = 96;
    //// INSTRUMENTS
    device.parametersById.get("wash_gain").value = 0.03;
    device.parametersById.get("bass01_gain").value = 0.50;
    device.parametersById.get("monosynth01_gain").value = 0.50;
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

function updateRNBOPARAM_master_LPF() {
    // console.log("updateRNBOPARAM_background_gain")
    let val = PARAMS.master_LPF;
    let adjustedValue = calcParamValue(val,0,20000,6);
    try{ device.parametersById.get("master_LPF").value = adjustedValue } catch(error) {}
    document.getElementById("canvasLabel_master_LPF").textContent = "Filter (" + adjustedValue.toFixed(0) + " Hz)";
}

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
    let adjustedValue = calcParamValue(1-val,-0.9,32,2);
    try{ device.parametersById.get("curve").value = adjustedValue } catch(error) {}
        let displayedValue = 1 + (val)*99;
    document.getElementById("canvasLabel_release").textContent = "Release (" + displayedValue.toFixed(0) + ")";
}




// function assignParam_gain(device) {
//     const param_gain = device.parametersById.get("gain");
//     let adjustedValue = VAL[0];
//     param_gain.value = adjustedValue;
//     // document.getElementById("canvas1label").textContent = "Drive (" + adjustedValue.toFixed(0) + ")";
//     // console.log("gain",adjustedValue);
// }


// function assignParam_chance(device) {
//     const param_chance = device.parametersById.get("prob");
//     let adjustedValue = calcParamValue(VAL[1],1,100,2);
//     param_chance.value = adjustedValue;
//     document.getElementById("canvas2label").textContent = "Chance (" + adjustedValue.toFixed(0) + "%)";
//     // console.log("prob",adjustedValue);
// }


// function assignParam_time(device) {
//     const param_time = device.parametersById.get("time");
//     let adjustedValue = calcParamValue(VAL[2],100,4000,2);
//     param_time.value = adjustedValue;
//     document.getElementById("canvas3label").textContent = "Time (" + adjustedValue.toFixed(0) + "ms)";
//     // console.log("time",adjustedValue);
// }

// function assignParam_curve(device) {
//     const param_curve = device.parametersById.get("curve");
//     let adjustedValue = calcParamValue(1-VAL[3],-0.9,32,2);
//     param_curve.value = adjustedValue;
//     let displayedValue = 1+ (VAL[3])*99;
//     document.getElementById("canvas4label").textContent = "Release (" + displayedValue.toFixed(0) + ")";
//     // console.log("release",adjustedValue);
// }




function calcParamValue(normalVal,min,max,pow) {

    let adjustedValue = min + (max-min)*normalVal**pow;

    return adjustedValue;

}