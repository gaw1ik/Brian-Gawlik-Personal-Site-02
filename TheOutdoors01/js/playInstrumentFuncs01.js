



function play_monosynth01() {
    // console.log("play_monosynth01")

    if(makeChoice(PROB)) {
        const param_monosynth01_deg = device.parametersById.get("monosynth01_deg");
        let adjustedValue = getRandomInt(-4,5);
        param_monosynth01_deg.value = adjustedValue;
    }
    setTimeout(play_monosynth01,TIME);

};


monosynth02_deg = 1;

function play_monosynth02() {
    // console.log("play_monosynth02")
    if(makeChoice(PROB)) {
        const param_monosynth02_deg = device.parametersById.get("monosynth02_deg");
        monosynth02_deg = monosynth02_deg + getRandomInt(1,2);
        if(monosynth02_deg>10) {
            monosynth02_deg = 1;
        }
        param_monosynth02_deg.value = monosynth02_deg;
    }
    setTimeout(play_monosynth02,TIME*2);
};

function play_polysynth01() {
    // console.log("play_polysynth01")
    if(makeChoice(PROB)) {
        const param_polysynth01_deg = device.parametersById.get("polysynth01_deg");
        let adjustedValue = chooseFromArray([-4, -2, -1, 1, 2, 3, 5]);
        param_polysynth01_deg.value = adjustedValue;
    }
    setTimeout(play_polysynth01,TIME*4);
};


function play_bass01() {
    // console.log("play_bass01")
    if(makeChoice(PROB)) {
        const param_bass01_deg = device.parametersById.get("bass01_deg");
        let adjustedValue = chooseFromArray([1, -1, -3]);
        param_bass01_deg.value = adjustedValue;
    }
    setTimeout(play_bass01,TIME*3);
};