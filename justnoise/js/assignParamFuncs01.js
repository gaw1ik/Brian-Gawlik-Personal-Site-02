function setupParams() {


    






    //////// NON-UI PARAMS


    //// Others
    // device.parametersById.get("crackle_gain").value = 0;

    device.parametersById.get("master_monoToggle").value = 0;
    device.parametersById.get("master_HPF").value = 120;

    device.parametersById.get("reverb_decay").value = 80;
    device.parametersById.get("reverb_gain").value = 0.3;

    //// Background
    // device.parametersById.get("background_pan").value = 0.5;
    device.parametersById.get("background_send").value = 0.7;

    //// Hiss
    device.parametersById.get("hiss_pan").value = 0.9;
    device.parametersById.get("hiss_send").value = 0.9;





    // ms01 (wash)
    device.parametersById.get("ms01/oct").value = 1;
    device.parametersById.get("ms01/shape").value = 1;
    device.parametersById.get("ms01/pow").value = 2;
    device.parametersById.get("ms01/gain").value = 0.1;
    device.parametersById.get("ms01/osc").value = 4;
    device.parametersById.get("ms01/pan").value = 0.2;
    device.parametersById.get("ms01/lpf").value = 2000;
    device.parametersById.get("ms01/send").value = 0.7;



    // ps01 (rush)
    device.parametersById.get("ps01/oct").value = 1;
    device.parametersById.get("ps01/shape").value = 1;
    device.parametersById.get("ps01/pow").value = 1.2;
    device.parametersById.get("ps01/gain").value = 0.5;
    device.parametersById.get("ps01/osc").value = 3;
    device.parametersById.get("ps01/pan").value = 0.8;
    device.parametersById.get("ps01/hpf").value = 400;
    device.parametersById.get("ps01/lpf").value = 2400;
    device.parametersById.get("ps01/send").value = 0.7;




    // ps02 (crackle)
    device.parametersById.get("ps02/oct").value = 0.5;
    device.parametersById.get("ps02/shape").value = 1;
    device.parametersById.get("ps02/pow").value = 8;
    device.parametersById.get("ps02/gain").value = 0.2;
    device.parametersById.get("ps02/osc").value = 4;
    device.parametersById.get("ps02/pan").value = 0.3;
    device.parametersById.get("ps02/lpf").value = 2000;
    device.parametersById.get("ps02/send").value = 0.7;




    for(let i=0; i<Object.keys(PARAMS).length; i++) {

        let paramName = Object.keys(PARAMS)[i];
        console.log("paramName",paramName)
        // RRRRNBOPARAMS[paramName].value = PARAMS[paramName];
        let funcName = "updateRNBOPARAM_"+ paramName;
        window[funcName](); // run the assign function corresponding to the active parameter

        let canvas = document.getElementById("canvas_" + paramName)
        // console.log("PARAMS[paramName]",PARAMS[paramName])

        drawKnob(canvas,PARAMS[paramName]);

    }

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
    try{ device.parametersById.get("ms01/gain").value = adjustedValue } catch(error) {}
}
function updateRNBOPARAM_wash_intervalTimeMin() {
    let val = PARAMS.wash_intervalTimeMin;
    let adjustedValue = calcParamValue(val,6000,16000,1);
    wash_envelopeTime = getRandomInt(adjustedValue, adjustedValue*2.0);

    wash_attackTime = wash_envelopeTime * 5/12;
    wash_decayTime = wash_envelopeTime * 9/12;

    device.parametersById.get("ms01/attack").value = wash_attackTime;
    device.parametersById.get("ms01/decay").value = wash_decayTime;
}

// rush
function updateRNBOPARAM_rush_gain() {
    let val = PARAMS.rush_gain;
    let adjustedValue = calcParamValue(val,0,2,2);
    try{ device.parametersById.get("ps01/gain").value = adjustedValue } catch(error) {}
}


// rush_attackTime = 2000;
// rush_decayTime = 2000;

function updateRNBOPARAM_rush_intervalTimeMin() {
    let val = PARAMS.rush_intervalTimeMin;
    let adjustedValue = calcParamValue(val,400,4000,2);
    rush_intervalTimeMin = adjustedValue;

    // rush_attackTime = adjustedValue*2;
    // rush_decayTime = adjustedValue*2;



    // rush_totalEnvelopeTime = rush_attackTime+rush_decayTime;

    // device.parametersById.get("ps01/attack").value = rush_attackTime;
    // device.parametersById.get("ps01/decay").value = rush_decayTime;
    // try{ device.parametersById.get("rush_intervalTimeMin").value = adjustedValue } catch(error) {}
}


// crackle
function updateRNBOPARAM_crackle_gain() {
    let val = PARAMS.crackle_gain;
    let adjustedValue = calcParamValue(val,0,4,4);
    try{ device.parametersById.get("ps02/gain").value = adjustedValue } catch(error) {}
}

function updateRNBOPARAM_crackle_intervalTimeMin() {
    let val = PARAMS.crackle_intervalTimeMin;
    let adjustedValue = calcParamValue(val,10,200,2);
    crackle_intervalTimeMin = adjustedValue;

    // try{ device.parametersById.get("crackle_thresh").value = adjustedValue } catch(error) {}
}

// function updateRNBOPARAM_crackle_LPF() {
//     let val = PARAMS.crackle_LPF;
//     let adjustedValue = calcParamValue(val,100,20000,2);
//     try{ device.parametersById.get("cracklepop_LPF").value = adjustedValue } catch(error) {}
// }





// master



function updateRNBOPARAM_master_gain() {
    let val = PARAMS.master_gain;
    let adjustedValue = calcParamValue(val,0,12,2);
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