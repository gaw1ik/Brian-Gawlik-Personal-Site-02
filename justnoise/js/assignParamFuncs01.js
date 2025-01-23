







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
    //// Pans
    device.parametersById.get("hiss_pan").value = 0.9;
    device.parametersById.get("rush_pan").value = 0.20;
    //// Others
    device.parametersById.get("master_monoToggle").value = 0;
    device.parametersById.get("master_reverb").value = 80;
    device.parametersById.get("master_HPF").value = 120;
    device.parametersById.get("wash_start").value = 1;

}



// background
function updateRNBOPARAM_background_gain() {
    let val = PARAMS.background_gain;
    let adjustedValue = calcParamValue(val,0,1,2);
    try{ device.parametersById.get("background_gain").value = adjustedValue } catch(error) {}
    // document.getElementById("canvasLabel_background_gain").textContent = "Drive (" + adjustedValue.toFixed(0) + ")";
}

function updateRNBOPARAM_background_LPF() {
    let val = PARAMS.background_LPF;
    let adjustedValue = calcParamValue(val,1,20000,2);
    // console.log("adjustedValue",adjustedValue)
    try{ device.parametersById.get("background_LPF").value = adjustedValue } catch(error) {}
}

function updateRNBOPARAM_background_param() {
    let adjustedValue = PARAMS.background_param;
    try{ device.parametersById.get("background_param").value = adjustedValue } catch(error) {}
}

// hiss
function updateRNBOPARAM_hiss_gain() {
    let val = PARAMS.hiss_gain;
    let adjustedValue = calcParamValue(val,0,1,4);

    try{ device.parametersById.get("hiss_gain").value = adjustedValue } catch(error) {}
}
function updateRNBOPARAM_hiss_BPF() {
    let val = PARAMS.hiss_BPF;
    let adjustedValue = calcParamValue(val,2000,20000,1);
    try{ device.parametersById.get("hiss_BPF").value = adjustedValue } catch(error) {}
}

// wash
function updateRNBOPARAM_wash_gain() {
    let val = PARAMS.wash_gain;
    let adjustedValue = calcParamValue(val,0,1,1);
    try{ device.parametersById.get("wash_gain").value = adjustedValue } catch(error) {}
}

function updateRNBOPARAM_wash_period() {
    let val = PARAMS.wash_period;
    let adjustedValue = calcParamValue(val,1000,20000,1); // val min max pow
    try{ device.parametersById.get("wash_period").value = adjustedValue } catch(error) {}
}

// rush
function updateRNBOPARAM_rush_gain() {
    let val = PARAMS.rush_gain;
    let adjustedValue = calcParamValue(val,0,1,2);
    try{ device.parametersById.get("rush_gain").value = adjustedValue } catch(error) {}
}

function updateRNBOPARAM_rush_flux() {
    let val = PARAMS.rush_flux;
    let adjustedValue = calcParamValue(val,0.1,1,1);
    try{ device.parametersById.get("rush_flux").value = adjustedValue } catch(error) {}
}


// crackle
function updateRNBOPARAM_crackle_gain() {
    let val = PARAMS.crackle_gain;
    let adjustedValue = calcParamValue(val,0,0.2,2);
    try{ device.parametersById.get("crackle_gain").value = adjustedValue } catch(error) {}
}

function updateRNBOPARAM_crackle_thresh() {
    let val = PARAMS.crackle_thresh;
    let adjustedValue = calcParamValue(1-val,0.90,0.99999,0.1);
    try{ device.parametersById.get("crackle_thresh").value = adjustedValue } catch(error) {}
}

function updateRNBOPARAM_crackle_LPF() {
    let val = PARAMS.crackle_LPF;
    let adjustedValue = calcParamValue(val,100,20000,2);
    try{ device.parametersById.get("cracklepop_LPF").value = adjustedValue } catch(error) {}
}





// master
function updateRNBOPARAM_master_gain() {
    let val = PARAMS.master_gain;
    let adjustedValue = calcParamValue(val,0,1,2);
    try{
        try{ device.parametersById.get("master_gain").value = adjustedValue } catch(error) {}
    } catch(error) {
        //
    }
}  

function updateRNBOPARAM_master_LPF() {
    let val = PARAMS.master_LPF;
    let adjustedValue = calcParamValue(val,1,20000,2);
    try{ device.parametersById.get("master_LPF").value = adjustedValue } catch(error) {}
}








function calcParamValue(normalVal,min,max,pow) {

    let adjustedValue = min + (max-min)*normalVal**pow;

    return adjustedValue;

}