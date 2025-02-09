function setTheme() {

    let themes = ['light','dark'];

    themeName = themes[themeIndex];


    // console.log(themeIndex)
    // console.log(themeName)


    const cssroot = document.documentElement;

    if(themeName=='light') {


        //////// JS
        //// KNOBS
        [hueKnobNeedle,satKnobNeedle,litKnobNeedle,alphaKnobNeedle] = [0, 0, 30, 0.5];
        [hueKnobBottom,satKnobBottom,litKnobBottom,alphaKnobBottom] = [40, 0, 40, 1.0];
        [hueKnobTop,satKnobTop,litKnobTop,alphaKnobTop] = [40, 50, 65, 1.0];
        [hueKnobShadow,satKnobShadow,litKnobShadow,alphaKnobShadow] = [0, 0, 0, 0.10];

        [hueUI1,satUI1,litUI1,alphaUI1] = [40, 50, 50, 150];


        // if(deviceWidth<800) {
        //     alphaUI1 = 100;
        // }


        //////// CSS
        [hueBG, satBG, litBG] =  [40,100,100];
        [hueBG2,satBG2,litBG2,alphaBG2] = [40, 90, 70, 50];
        let hslBG = "hsl(" + hueBG + ", " + satBG + "%, " + litBG + "%)";
        cssroot.style.setProperty('--bg-hsl', hslBG);
        cssroot.style.setProperty('--text-color-body', 'hsl(0,0%,10%)');
        cssroot.style.setProperty('--text-color-h1','hsl(0,0%,10%)');
        cssroot.style.setProperty('--controlsContainer01-hsl','hsl(40, 90%, 70%, 0.0)');
        cssroot.style.setProperty('--controlsContainer01-border-hsl','hsl(0, 0%, 100%, 0.1)');


    } else if (themeName=='dark') {

        //////// JS
        //// KNOBS
        [hueKnobNeedle,satKnobNeedle,litKnobNeedle,alphaKnobNeedle] = [0, 0, 90, 0.5];
        [hueKnobBottom,satKnobBottom,litKnobBottom,alphaKnobBottom] = [40, 0, 20, 1.0];
        [hueKnobTop,satKnobTop,litKnobTop,alphaKnobTop] = [40, 50, 26, 1.0];
        [hueKnobShadow,satKnobShadow,litKnobShadow,alphaKnobShadow] = [0, 0, 0, 0.13];

        [hueUI1,satUI1,litUI1,alphaUI1] = [40, 50, 26, 150];

        // if(deviceWidth<800) {
        //     alphaUI1 = 100;
        // }

        //////// CSS
        [hueBG, satBG, litBG] =  [220,20,10];
        [hueBG2,satBG2,litBG2,alphaBG2] = [40, 90, 70, 0];

        let hslBG = "hsl(" + hueBG + ", " + satBG + "%, " + litBG + "%)";
        cssroot.style.setProperty('--bg-hsl', hslBG);
        cssroot.style.setProperty('--text-color-body', 'hsl(0,0%,90%)');
        cssroot.style.setProperty('--text-color-h1','hsl(0,0%,90%)');
        // cssroot.style.setProperty('--controlsContainer01-hsl','hsl(37, 51%, 30%, 0.0)');
        cssroot.style.setProperty('--controlsContainer01-hsl','hsl(220, 20%, 10%, 0.0)');

        cssroot.style.setProperty('--controlsContainer01-border-hsl','hsl(0, 0%, 10%, 0.1)');

    }

    handleResize();

    // draw_canvasSetTheme();

    themeIndex = (themeIndex + 1) % 2;



}





