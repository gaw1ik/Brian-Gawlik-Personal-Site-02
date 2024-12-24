


function assignParam_gain(device) {
    const param_gain = device.parametersById.get("gain");
    let adjustedValue = VAL[0]*120.0;
    param_gain.value = adjustedValue;
    document.getElementById("canvas1label").textContent = "Drive (" + adjustedValue.toFixed(0) + ")";
    // console.log("gain",adjustedValue);
}


function assignParam_prob(device) {
    const param_prob = device.parametersById.get("prob");
    let adjustedValue = calcParamValue(VAL[1],1,100,2);
    param_prob.value = adjustedValue;
    document.getElementById("canvas2label").textContent = "Density (" + adjustedValue.toFixed(0) + "%)";
    // console.log("prob",adjustedValue);
}


function assignParam_time(device) {
    const param_time = device.parametersById.get("time");
    let adjustedValue = calcParamValue(VAL[2],100,4000,2);
    param_time.value = adjustedValue;
    document.getElementById("canvas3label").textContent = "Time (" + adjustedValue.toFixed(0) + "ms)";
    // console.log("time",adjustedValue);
}

function assignParam_curve(device) {
    const param_curve = device.parametersById.get("curve");
    let adjustedValue = calcParamValue(1-VAL[3],-0.9,32,2);
    param_curve.value = adjustedValue;
    let displayedValue = 1+ (VAL[3])*99;
    document.getElementById("canvas4label").textContent = "Release (" + displayedValue.toFixed(0) + ")";
    // console.log("release",adjustedValue);
}




function calcParamValue(normalVal,min,max,pow) {

    let adjustedValue = min + (max-min)*normalVal**pow;

    return adjustedValue;

}