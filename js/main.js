
//window.addEventListener('DOMContentLoaded', () => {
borderOffProperty = "1px solid rgba(100, 100, 100, 0.0)";
borderOnProperty  = "1px solid white";

window.onload = function () {


    // get elements for the pageButtons and pageContainers
    pageButtons = document.getElementsByClassName("pageButton");
    pageContainers = document.getElementsByClassName("pageContainer");

    



    // when you first open the page you'll want to mute all pages except for one.
    for(let i=0; i<pageContainers.length; i++) {
        pageContainers[i].style.display = "none";
        pageButtons[i].style.borderBottom = borderOffProperty;
    }

    pageContainers[0].style.display = "block";
    pageButtons[0].style.borderBottom = borderOnProperty;



    // add the pageButton event listeners
    for(let i=0; i<pageButtons.length; i++) {

        pageButtons[i].addEventListener( "click", onPageButtonClick );
    
    }

};










function onPageButtonClick() {

    //console.log(this.id);

    for(let i=0; i<pageContainers.length; i++) {
        pageContainers[i].style.display = "none";
        pageButtons[i].style.borderBottom = borderOffProperty;
    }

    let pageIndex = getNamedIndexOfElement("Page", this)

    pageContainers[pageIndex].style.display = "block";
    pageButtons[pageIndex].style.borderBottom = borderOnProperty;

}














