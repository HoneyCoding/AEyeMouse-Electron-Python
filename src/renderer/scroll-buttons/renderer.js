// Containers
const mainContainer = document.getElementById("main-container");

// Scroll Container Elements
const moveButton = document.getElementById("move-btn");
const closeButton = document.getElementById("close-btn");

moveButton.addEventListener('click', function (e) {
    electronAPI.showMoveScrollWindow();
});
closeButton.addEventListener("click", function (e) {
    electronAPI.hideScrollWindow();
});
