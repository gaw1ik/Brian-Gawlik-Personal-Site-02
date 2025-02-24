



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
            [hueKnobBottom,satKnobBottom,litKnobBottom,alphaKnobBottom] = [200, 0, 40, 1.0];
            [hueKnobTop,satKnobTop,litKnobTop,alphaKnobTop] = [200, 50, 70, 1.0];
            [hueKnobShadow,satKnobShadow,litKnobShadow,alphaKnobShadow] = [0, 0, 0, 0.10];
    
            //////// CSS
            [hueBG, satBG, litBG] =  [190,100,100];
            let hslBG = "hsl(" + hueBG + ", " + satBG + "%, " + litBG + "%)";
            cssroot.style.setProperty('--bg-hsl', hslBG);
            cssroot.style.setProperty('--text-color-body', 'hsl(0,0%,10%)');
            cssroot.style.setProperty('--text-color-h1','hsl(0,0%,10%)');
            cssroot.style.setProperty('--controlsContainer01-hsl','hsl(210, 90%, 80%, 0.1)');
            cssroot.style.setProperty('--controlsContainer01-border-hsl','hsl(0, 0%, 100%, 0.1)');

            //////// OnOff Button
            [hue_onoff1,sat_onoff1,lit_onoff1,alpha_onoff1] = [30, 70, 50, 150];
            [hue_onoff0,sat_onoff0,lit_onoff0,alpha_onoff0] = [0,0,60,255];
    
    
        } else if (themeName=='dark') {
    
            //////// JS
            //// KNOBS
            [hueKnobNeedle,satKnobNeedle,litKnobNeedle,alphaKnobNeedle] = [0, 0, 90, 0.5];
            [hueKnobBottom,satKnobBottom,litKnobBottom,alphaKnobBottom] = [200, 0, 20, 1.0];
            [hueKnobTop,satKnobTop,litKnobTop,alphaKnobTop] = [200, 50, 26, 1.0];
            [hueKnobShadow,satKnobShadow,litKnobShadow,alphaKnobShadow] = [0, 0, 0, 0.13];
    
            //////// CSS
            [hueBG, satBG, litBG] =  [215,20,12];
            let hslBG = "hsl(" + hueBG + ", " + satBG + "%, " + litBG + "%)";
            cssroot.style.setProperty('--bg-hsl', hslBG);
            cssroot.style.setProperty('--text-color-body', 'hsl(0,0%,90%)');
            cssroot.style.setProperty('--text-color-h1','hsl(0,0%,90%)');
            cssroot.style.setProperty('--controlsContainer01-hsl','hsl(215, 50%, 38%, 0.1)');
            cssroot.style.setProperty('--controlsContainer01-border-hsl','hsl(0, 0%, 10%, 0.1)');

            //////// OnOff Button
            [hue_onoff1,sat_onoff1,lit_onoff1,alpha_onoff1] = [40,100,33,100];
            [hue_onoff0,sat_onoff0,lit_onoff0,alpha_onoff0] = [0,0,60,150];
    
        }
    
        handleResize();
    
        // draw_canvasSetTheme();
    
        themeIndex = (themeIndex + 1) % 2;
    
    
    
    }