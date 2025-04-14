wash_timer = 0;
wash_intervalTimeMin = 0;
wash_nextIntervalTime = 0;
wash_attackTime = 0;
wash_decayTime = 0;


function playWash() {

    let vel = getRandomFloat(0.5,0.7);
    playNote_ms01(1,vel);

    // reset timer
    wash_timer = 0;

    let intervalTimeMin = wash_envelopeTime*1.1;
    let intervalTimeMax = intervalTimeMin*1.5;
    wash_nextIntervalTime = getRandomInt(intervalTimeMin,intervalTimeMax);

    setTimeout(playWash,wash_nextIntervalTime);

}

rush_timer = [0,0,0,0,0,0,0,0];
voiceI = 0;

rush_attackTime = [0,0,0,0,0,0,0,0];
rush_decayTime = [0,0,0,0,0,0,0,0];


function playRush() {

    

    if(makeChoice(90)) {
        return;
    }

    // console.log(voiceI%8);

    // device.parametersById.get("ps01/lpf").value = getRandomInt(400,8000);

    let i = voiceI%8;
    rush_attackTime[i] = getRandomFloat(800,1600);
    rush_decayTime[i]  = getRandomFloat(3000,6000);
    device.parametersById.get("ps01/attack").value = rush_attackTime[i];
    device.parametersById.get("ps01/decay").value = rush_decayTime[i];

    let vel = getRandomFloat(0.3,0.7);
    // let vel = 0.7;

    playNote_ps01(1,vel);

    

    // let intervalTimeMin = rush_intervalTimeMin;
    // let intervalTimeMax = intervalTimeMin*4;
    // let nextIntervalTime = getRandomInt(intervalTimeMin,intervalTimeMax);

    let nextIntervalTime = rush_attackTime[i];


    voiceI+=1;
    rush_timer[i] = 0;
    // setTimeout(playRush,nextIntervalTime);

}

function playCrackle() {

    device.parametersById.get("ps02/attack").value = getRandomFloat(0,1);
    device.parametersById.get("ps02/decay").value = getRandomFloat(1,10);

    let vel = getRandomFloat(0.1,0.7);

    playNote_ps02(1,vel);

    let intervalTimeMin = crackle_intervalTimeMin;
    let intervalTimeMax = intervalTimeMin*8;
    let nextIntervalTime = getRandomInt(intervalTimeMin,intervalTimeMax);

    setTimeout(playCrackle,nextIntervalTime);

}


function playNote_ms01(deg,vel) {
    device.parametersById.get("ms01/vel").value = vel;
    device.parametersById.get("ms01/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}
function playNote_ps01(deg,vel) {
    device.parametersById.get("ps01/vel").value = vel;
    device.parametersById.get("ps01/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}
function playNote_ps02(deg,vel) {
    device.parametersById.get("ps02/vel").value = vel;
    device.parametersById.get("ps02/deg").value = deg + getRandomFloat(0,0.1)*Math.sign(deg);
}