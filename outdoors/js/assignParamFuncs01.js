







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
    device.parametersById.get("background_hiss_pan").value = 0.05;
    device.parametersById.get("rush_pan").value = 0.20;
    device.parametersById.get("insects_pan").value = 0.90;
    device.parametersById.get("birds_pan").value = 0.10;
    //// Others
    device.parametersById.get("birds_LPF").value = 4800;
    device.parametersById.get("master_monoToggle").value = 0;
    device.parametersById.get("master_reverb").value = 80;
    device.parametersById.get("master_HPF").value = 120;
    device.parametersById.get("wash_start").value = 1;
    device.parametersById.get("birds_start").value = 1;







}



// bass01
function updateRNBOPARAM_background_gain() {
    // console.log("updateRNBOPARAM_background_gain")
    let adjustedValue = PARAMS.background_gain;
    try{ device.parametersById.get("background_gain").value = adjustedValue } catch(error) {}
    // document.getElementById("canvasLabel_background_gain").textContent = "Drive (" + adjustedValue.toFixed(0) + ")";
}

function updateRNBOPARAM_background_hiss() {
    let adjustedValue = PARAMS.background_hiss;
    try{ device.parametersById.get("background_hiss").value = adjustedValue } catch(error) {}
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

// wash
function updateRNBOPARAM_wash_gain() {
    let adjustedValue = PARAMS.wash_gain;
    try{ device.parametersById.get("wash_gain").value = adjustedValue } catch(error) {}
}

function updateRNBOPARAM_wash_period() {
    let val = PARAMS.wash_period;
    let adjustedValue = calcParamValue(val,1000,20000,1); // val min max pow
    try{ device.parametersById.get("wash_period").value = adjustedValue } catch(error) {}
}

// rush
function updateRNBOPARAM_rush_gain() {
    let adjustedValue = PARAMS.rush_gain;
    try{ device.parametersById.get("rush_gain").value = adjustedValue } catch(error) {}
}

function updateRNBOPARAM_rush_speed() {
    let adjustedValue = PARAMS.rush_speed;
    try{ device.parametersById.get("rush_speed").value = adjustedValue } catch(error) {}
}

// insects
function updateRNBOPARAM_insects_gain() {
    let adjustedValue = PARAMS.insects_gain;
    try{ device.parametersById.get("insects_gain").value = adjustedValue } catch(error) {}
}

function updateRNBOPARAM_insects_period() {
    let val = PARAMS.insects_period;
    let adjustedValue = calcParamValue(val,100,8000,1); // val min max pow
    try{ device.parametersById.get("insects_period").value = adjustedValue } catch(error) {}
}

function updateRNBOPARAM_insects_rate() {
    let val = PARAMS.insects_rate;
    let adjustedValue = calcParamValue(val,4,16,1); // val min max pow
    try{ device.parametersById.get("insects_rate").value = adjustedValue } catch(error) {}
}  

function updateRNBOPARAM_insects_freq() { // i think this ties into both freq and Q (a normalized value)
    let adjustedValue = PARAMS.insects_freq;
    try{ device.parametersById.get("insects_freq").value = adjustedValue } catch(error) {}
}

// birds
function updateRNBOPARAM_birds_gain() {
    let adjustedValue = PARAMS.birds_gain;
    try{ device.parametersById.get("birds_gain").value = adjustedValue } catch(error) {}
}

// function updateRNBOPARAM_birds_filt() {
//     let adjustedValue = PARAMS.birds_filt*20000;
//     try{ device.parametersById.get("birds_filt").value = adjustedValue } catch(error) {}
// }

function updateRNBOPARAM_birds_period0() {
    let val = PARAMS.birds_period0;
    let adjustedValue = calcParamValue(val,100,4000,1); // val min max pow
    try{ device.parametersById.get("birds_period0").value = adjustedValue } catch(error) {}
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





// let adjustedValue = calcParamValue(1-VAL[3],-0.9,32,2);
// let displayedValue = 1+ (VAL[3])*99;


function calcParamValue(normalVal,min,max,pow) {

    let adjustedValue = min + (max-min)*normalVal**pow;

    return adjustedValue;

}