
function setupParams() {
    // bass01
    param_bass01_oct = device.parametersById.get("bass01_oct");
    param_bass01_att = device.parametersById.get("bass01_att");
    param_bass01_dec = device.parametersById.get("bass01_dec");
    param_bass01_shape = device.parametersById.get("bass01_shape");
    param_bass01_decCurve = device.parametersById.get("bass01_decCurve");
    param_bass01_gain = device.parametersById.get("bass01_gain");


    // monosynth01
    param_monosynth01_oct = device.parametersById.get("monosynth01_oct");
    param_monosynth01_att = device.parametersById.get("monosynth01_att");
    param_monosynth01_dec = device.parametersById.get("monosynth01_dec");
    param_monosynth01_shape = device.parametersById.get("monosynth01_shape");
    param_monosynth01_decCurve = device.parametersById.get("monosynth01_decCurve");
    param_monosynth01_gain = device.parametersById.get("monosynth01_gain");

    // monosynth02
    param_monosynth02_oct = device.parametersById.get("monosynth02_oct");
    param_monosynth02_att = device.parametersById.get("monosynth02_att");
    param_monosynth02_dec = device.parametersById.get("monosynth02_dec");
    param_monosynth02_shape = device.parametersById.get("monosynth02_shape");
    param_monosynth02_decCurve = device.parametersById.get("monosynth02_decCurve");
    param_monosynth02_gain = device.parametersById.get("monosynth02_gain");

    // polysynth01
    param_polysynth01_oct = device.parametersById.get("polysynth01_oct");
    param_polysynth01_att = device.parametersById.get("polysynth01_att");
    param_polysynth01_dec = device.parametersById.get("polysynth01_dec");
    param_polysynth01_shape = device.parametersById.get("polysynth01_shape");
    param_polysynth01_decCurve = device.parametersById.get("polysynth01_decCurve");
    param_polysynth01_gain = device.parametersById.get("polysynth01_gain");

    // wash01
    param_wash_gain = device.parametersById.get("wash_gain");

    // master
    param_master_cracklepop = device.parametersById.get("master_cracklepop");


    // bass01
    param_bass01_oct.value = 0.25;
    param_bass01_att.value = 240;
    param_bass01_dec.value = 3600;
    param_bass01_shape.value = 1.3;
    param_bass01_decCurve.value = 0;
    param_bass01_gain.value = 0.5;

    // monosynth01
    param_monosynth01_oct.value = 1;
    param_monosynth01_att.value = 240;
    param_monosynth01_dec.value = 2400;
    param_monosynth01_shape.value = 1.3;
    param_monosynth01_decCurve.value = 2;
    param_monosynth01_gain.value = 0.5;

    // monosynth02
    param_monosynth02_oct.value = 0.5;
    param_monosynth02_att.value = 240;
    param_monosynth02_dec.value = 2400;
    param_monosynth02_shape.value = 1.3;
    param_monosynth02_decCurve.value = 2;
    // param_monosynth02_gain.value = 0.5; // its wrapped up in monosynth01_gain

    // polysynth01
    param_polysynth01_oct.value = 4;
    param_polysynth01_att.value = 1200;
    param_polysynth01_dec.value = 3600;
    param_polysynth01_shape.value = 1.3;
    param_polysynth01_decCurve.value = 0;
    param_polysynth01_gain.value = 0.15;

    // wash01
    param_wash_gain.value = 0.01;

    // master
    param_master_cracklepop.value = 0.005;
}






function assignParam_drive(device) {
    const param_drive = device.parametersById.get("drive");
    let adjustedValue = VAL[0]*120.0;
    param_drive.value = adjustedValue;
    document.getElementById("canvas1label").textContent = "Drive (" + adjustedValue.toFixed(0) + ")";
    // console.log("gain",adjustedValue);
}


function assignParam_prob() {
    // const param_prob = device.parametersById.get("prob");
    let adjustedValue = calcParamValue(VAL[1],0,100,1.2);
    // param_prob.value = adjustedValue;
    PROB = adjustedValue;
    document.getElementById("canvas2label").textContent = "Prob (" + adjustedValue.toFixed(0) + "%)";
    // console.log("prob",adjustedValue);
}


function assignParam_time() {
    // const param_time = device.parametersById.get("time");
    let adjustedValue = calcParamValue(VAL[2],100,4000,2);
    // param_time.value = adjustedValue;
    TIME = adjustedValue;
    document.getElementById("canvas3label").textContent = "Time (" + adjustedValue.toFixed(0) + "ms)";
    // console.log("time",adjustedValue);
}

function assignParam_curve(device) {
    // const param_curve = device.parametersById.get("curve");
    let adjustedValue = calcParamValue(1-VAL[3],-0.9,32,2);
    // param_curve.value = adjustedValue;
    let displayedValue = 1+ (VAL[3])*99;
    document.getElementById("canvas4label").textContent = "Release (" + displayedValue.toFixed(0) + ")";
    // console.log("release",adjustedValue);
}




function calcParamValue(normalVal,min,max,pow) {

    let adjustedValue = min + (max-min)*normalVal**pow;

    return adjustedValue;

}