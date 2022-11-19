// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const title = document.getElementById("title");
const btnDoubleClick = document.getElementById("btnDoubleClick");
const btnRightClick = document.getElementById("btnRightClick");
const btnDrag = document.getElementById("btnDrag");
const btnScroll = document.getElementById("btnScroll");
const btnTeleport = document.getElementById("btnTeleport");

const btnList = [btnDoubleClick, btnRightClick, btnDrag, btnScroll];

const Mode = {
    doubleClick: "doubleClick",
    rightClick: "rightClick",
    drag: "drag",
    scroll: "scroll",
    teleport: "teleport"
};

let currentMode = Mode.doubleClick;

function updateUI() {
    // title.textContent = `현재 모드: ${currentMode}`;
}

// function controlMouse() {
//     switch (currentMode) {
//         case Mode.doubleClick:
//             electronAPI.setModeLeftClick();
//             break;
//         case Mode.rightClick:
//             electronAPI.setModeRightClick();
//             break;
//         case Mode.drag:
//             electronAPI.setModeDrag();
//             break;
//         case Mode.scroll:
//             electronAPI.setModeScroll();
//             break;
//         case Mode.teleport:
//             electronAPI.set;
//             break;
//     }
// }

btnDoubleClick.addEventListener("click", (e) => {
    currentMode = Mode.doubleClick;
    electronAPI.setModeDoubleClick();
    updateUI();
});

btnRightClick.addEventListener("click", (e) => {
    currentMode = Mode.rightClick;
    electronAPI.setModeRightClick();
    updateUI();
});

btnDrag.addEventListener("click", (e) => {
    currentMode = Mode.drag;
    electronAPI.showDragWindow();
    updateUI();
});

btnScroll.addEventListener("click", (e) => {
    currentMode = Mode.scroll;
    electronAPI.showScrollWindow();
    updateUI();
});

// btnTeleport.addEventListener("click", (e) => {
//     currentMode = Mode.teleport;
//     electronAPI.setModeTeleport();
// });
