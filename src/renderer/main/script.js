// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const btnMove = document.getElementById('move-btn');
const btnClose = document.getElementById('close-btn');

const btnDoubleClick = document.getElementById("btnDoubleClick");
const btnRightClick = document.getElementById("btnRightClick");
const btnDrag = document.getElementById("btnDrag");
const btnScroll = document.getElementById("btnScroll");

btnMove.addEventListener('click', (e) => {
    electronAPI.showMoveWindow();
});

btnClose.addEventListener('click', (e) => {
    electronAPI.closeMainWindow();
});

btnDoubleClick.addEventListener("click", (e) => {
    electronAPI.setModeDoubleClick();
});

btnRightClick.addEventListener("click", (e) => {
    electronAPI.setModeRightClick();
});

btnDrag.addEventListener("click", (e) => {
    electronAPI.showDragWindow();
});

btnScroll.addEventListener("click", (e) => {
    electronAPI.showScrollWindow();
});
