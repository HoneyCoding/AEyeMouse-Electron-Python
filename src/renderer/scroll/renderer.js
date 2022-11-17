// Containers
const mainContainer = document.getElementById("main-container");
const scrollContainer = document.getElementById("scroll-container");

// Scroll Container Elements
const scrollUpArea = document.getElementById("scroll-up-area");
const scrollDownArea = document.getElementById("scroll-down-area");
const closeButton = document.getElementById("close-btn");

let scrollUpAreaTimeout = null;
let scrollDownAreaTimeout = null;

let isScrollingUp = false;
let isScrollingDown = false;

const scrollDelay = 200;

scrollUpArea.addEventListener("mouseenter", function (e) {
    isScrollingUp = true;
    isScrollingDown = false;

    scrollUpAreaTimeout = setTimeout(function timeout() {
        scrollMouseUp();
        if (!isScrollingUp) return;
        scrollUpAreaTimeout = setTimeout(timeout, scrollDelay);
    }, scrollDelay);
});

scrollUpArea.addEventListener("mouseleave", function (e) {
    isScrollingUp = false;
    if (scrollUpAreaTimeout === null) return;
    clearTimeout(scrollUpAreaTimeout);
    scrollUpAreaTimeout = null;
});

scrollDownArea.addEventListener("mouseenter", function (e) {
    isScrollingUp = false;
    isScrollingDown = true;

    scrollDownAreaTimeout = setTimeout(function timeout() {
        scrollMouseDown();
        if (!isScrollingDown) return;
        scrollDownAreaTimeout = setTimeout(timeout, scrollDelay);
    }, scrollDelay);
});

scrollDownArea.addEventListener("mouseleave", function (e) {
    isScrollingDown = false;
    if (scrollDownAreaTimeout === null) return;
    clearTimeout(scrollDownAreaTimeout);
    scrollDownAreaTimeout = null;
});

closeButton.addEventListener("click", function (e) {
    electronAPI.closeWindow();
});

function scrollMouseUp() {
    electronAPI.scrollMouse("UP");
}

function scrollMouseDown() {
    electronAPI.scrollMouse("DOWN");
}
