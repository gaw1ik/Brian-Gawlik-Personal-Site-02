
versionNumber = "1.06c";
console.log("version ", versionNumber);

//window.addEventListener('DOMContentLoaded', () => {
borderOffProperty = "1px solid rgba(100, 100, 100, 0.0)";
borderOnProperty  = "1px solid white";

pageButtons = document.getElementsByClassName("pageButton");
pageContainers = document.getElementsByClassName("pageContainer");

for(let i=0; i<pageContainers.length; i++) {
    pageContainers[i].style.display = "none";
    pageButtons[i].style.borderBottom = borderOffProperty;
}


navToggleOn = -1;






window.onload = function () {


    // get elements for the pageButtons and pageContainers
    pageButtons = document.getElementsByClassName("pageButton");
    pageContainers = document.getElementsByClassName("pageContainer");


    

    



    // when you first open the page you'll want to mute all pages except for one.
    for(let i=0; i<pageContainers.length; i++) {
        pageContainers[i].style.display = "none";
        pageButtons[i].style.borderBottom = borderOffProperty;
    }

    pageContainers[0].style.display = "flex";
    pageButtons[0].style.borderBottom = borderOnProperty;



    // add the pageButton event listeners
    for(let i=0; i<pageButtons.length; i++) {

        pageButtons[i].addEventListener( "click", onPageButtonClick );
    
    }






    // Nav Toggle Stuff
    navToggleButton = document.getElementById("navToggleButton");
    navbar = document.getElementById("navbar");
    navToggleButton.addEventListener( "click", onNavToggleButtonClick );
    

};










function onPageButtonClick() {

    //console.log(this.id);

    for(let i=0; i<pageContainers.length; i++) {
        pageContainers[i].style.display = "none";
        pageButtons[i].style.borderBottom = borderOffProperty;
    }

    let pageIndex = getNamedIndexOfElement("Page", this);

    // // for changing image heights depending on the page selected
    // if(pageIndex==1) {
    //     document.documentElement.style.setProperty('--image-height', '70vh');
    // }

    pageContainers[pageIndex].style.display = "flex";
    pageButtons[pageIndex].style.borderBottom = borderOnProperty;

    onNavToggleButtonClick();

}







function onNavToggleButtonClick() {

    if( navToggleOn == 1 ) {

        // navbar.style.display = "none";
        navbar.className = "navbarClosed";

    } else if ( navToggleOn == -1 ) {

        // navbar.style.display = "flex";
        navbar.className = "navbarOpen";

    }

    // flip the value of navToggleOn
    navToggleOn = navToggleOn * -1;

    //console.log("navToggleOn",navToggleOn)
    
}














