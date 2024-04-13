
// versionNumber = "1.07b";
// console.log("version ", versionNumber);

//window.addEventListener('DOMContentLoaded', () => {
// borderOffProperty = "1px solid rgba(100, 100, 100, 0.0)";
// borderOnProperty  = "1px solid white";

// pageButtons = document.getElementsByClassName("pageButton");
// pageContainers = document.getElementsByClassName("pageContainer");

// for(let i=0; i<pageContainers.length; i++) {
//     pageContainers[i].style.display = "none";
//     pageButtons[i].style.borderBottom = borderOffProperty;
// }



// document.addEventListener("DOMContentLoaded", handleResize);

window.addEventListener("resize", handleResize);

window.addEventListener("load", handleResize);

// children = mainArtContainer0.childNodes;
// for(var i in children) {
//     if(children[i])
//     children[i].addEventListener("click", showFullScreenImage);
// }


let screenHeight = screen.height;
let screenWidth  = screen.width;
let screenAR = screenHeight/screenWidth;

if(screenAR < 1) {
    document.getElementById("TreesForSale").addEventListener("click", showFullScreenImage);
    document.getElementById("Campus").addEventListener("click", showFullScreenImage);
    document.getElementById("BoutToRain").addEventListener("click", showFullScreenImage);
    document.getElementById("WildfiresHaze").addEventListener("click", showFullScreenImage);

    document.getElementById("STLL3").addEventListener("click", showFullScreenImage);
    document.getElementById("Astoria Cross Sign").addEventListener("click", showFullScreenImage);
    document.getElementById("Birds on the Line").addEventListener("click", showFullScreenImage);
    document.getElementById("Bus Stop").addEventListener("click", showFullScreenImage);
    document.getElementById("STLL1").addEventListener("click", showFullScreenImage);
    document.getElementById("Tree on Siding").addEventListener("click", showFullScreenImage);
}



// document.getElementById("Astoria Cross Sign").addEventListener("touchstart", showFullScreenImage);
// document.getElementById("Birds on the Line").addEventListener("touchstart", showFullScreenImage);
// document.getElementById("Bus Stop").addEventListener("touchstart", showFullScreenImage);
// document.getElementById("STLL1").addEventListener("touchstart", showFullScreenImage);
// document.getElementById("Tree on Siding").addEventListener("touchstart", showFullScreenImage);

// document.getElementById("STLL3").addEventListener("touchend", showFullScreenImage);
// document.getElementById("Astoria Cross Sign").addEventListener("touchend", showFullScreenImage);
// document.getElementById("Birds on the Line").addEventListener("touchend", showFullScreenImage);
// document.getElementById("Bus Stop").addEventListener("touchend", showFullScreenImage);
// document.getElementById("STLL1").addEventListener("touchend", showFullScreenImage);
// document.getElementById("Tree on Siding").addEventListener("touchend", showFullScreenImage);







/////////////////////////////////////////////////////////////////// some of the major nodes
artOnTop = document.getElementById("artOnTop");
curtainForFullScreen = document.getElementById("curtainForFullScreen");
mainArtContainer0 = document.getElementById("mainArtContainer0");




/////////////////////////////////////////////////////////////////// handle window resize
function handleResize() {

    console.log("resize")

    Siding = document.getElementById("Tree on Siding");
    // Siding.style.width = "60%";


    let h1 = document.getElementById("Birds on the Line").clientHeight;
    let h2 = document.getElementById("Bus Stop").clientHeight;

    // console.log(h1,h2);

    // BirdsOnTheLine= document.getElementById("Birds on the Line");
    // BusStop = document.getElementById("Bus Stop");

    // BirdsOnTheLine.style.width = "50%";
    // BusStop.style.width = "50%";

    // BirdsOnTheLine.style.height = h1 + 'px';
    // BusStop.style.height = h2 + 'px';

    //////////////////////////////////////// these are reset to round them to the nearest pixel (prevents a slight misalignment)
    // BirdsOnTheLine.style.height = h1;
    // BusStop.style.height = h2;

    hTotal = h1+h2+10;

    AstoriaCrossSign = document.getElementById("Astoria Cross Sign");
    // AstoriaCrossSign.style.width = "60%";

    // AstoriaCrossSign.style.height = hTotal + 'px';



}






function showFullScreenImage() {

    curtainForFullScreen.style.display = "block";

    // mainArtContainer0.style.display = "none";

    mainArtContainer0.style.overflowY = "hidden";

    // document.body.style.overflowY = "hidden";

    artOnTop.style.display = "flex";
    // artOnTop.style.top = "0";

    fullScreenImg = document.createElement("img");

    fullScreenImg.src = this.src;

    // console.log(e)
    // console.log(this)

    artOnTop.appendChild(fullScreenImg);

    fullScreenImg.addEventListener("click", returnFromFullScreenImage);
}


function returnFromFullScreenImage() {

    artOnTop.removeChild(fullScreenImg);

    curtainForFullScreen.style.display = "none";

    // mainArtContainer0.style.display = "flex";

    document.body.style.overflowY = "scroll";

    artOnTop.style.display = "none";

    handleResize();
}



// window.onload = function () {


//     // get elements for the pageButtons and pageContainers
//     pageButtons = document.getElementsByClassName("pageButton");
//     pageContainers = document.getElementsByClassName("pageContainer");


    

    



//     // when you first open the page you'll want to mute all pages except for one.
//     for(let i=0; i<pageContainers.length; i++) {
//         pageContainers[i].style.display = "none";
//         pageButtons[i].style.borderBottom = borderOffProperty;
//     }

//     let defaultPageIndex = 0;

//     pageContainers[defaultPageIndex].style.display = "block";
//     pageButtons[defaultPageIndex].style.borderBottom = borderOnProperty;



//     // add the pageButton event listeners
//     for(let i=0; i<pageButtons.length; i++) {

//         pageButtons[i].addEventListener( "click", onPageButtonClick );
    
//     }






//     // Nav Toggle Stuff
//     navToggleButton = document.getElementById("navToggleButton");
//     navbar = document.getElementById("navbar");
//     navToggleButton.addEventListener( "click", onNavToggleButtonClick );
    

// };



























