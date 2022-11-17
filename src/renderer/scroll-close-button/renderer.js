// Containers
const mainContainer = document.getElementById("main-container");

// Scroll Container Elements
const closeButton = document.getElementById("close-btn");

closeButton.addEventListener("click", function (e) {
    electronAPI.closeWindow();
});