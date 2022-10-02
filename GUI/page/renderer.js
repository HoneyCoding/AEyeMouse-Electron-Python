// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const title = document.getElementById("title");
const btnLeftClick = document.getElementById("btnLeftClick");
const btnRightClick = document.getElementById("btnRightClick");
const btnDrag = document.getElementById("btnDrag");
const btnScroll = document.getElementById("btnScroll");
const btnTeleport = document.getElementById("btnTeleport");

const btnList = [btnLeftClick, btnRightClick, btnDrag, btnScroll];

const Mode = {
    leftClick: "leftClick",
    rightClick: "rightClick",
    drag: "drag",
    scroll: "scroll",
    teleport: "teleport"
};

let currentMode = Mode.leftClick;

function updateUI() {
    title.textContent = `현재 모드: ${currentMode}`;
}

function controlMouse() {
    switch (currentMode) {
        case Mode.leftClick:
            electronAPI.setModeLeftClick();
            break;
        case Mode.rightClick:
            electronAPI.setModeRightClick();
            break;
        case Mode.drag:
            electronAPI.setModeDrag();
            break;
        case Mode.scroll:
            electronAPI.setModeScroll();
            break;
        case Mode.teleport:
            electronAPI.set
            break;
    }
}

btnLeftClick.addEventListener("click", (e) => {
    currentMode = Mode.leftClick;
    electronAPI.setModeLeftClick();
    updateUI();
});

btnRightClick.addEventListener("click", (e) => {
    currentMode = Mode.rightClick;
    electronAPI.setModeRightClick();
    updateUI();
});

btnDrag.addEventListener("click", (e) => {
    currentMode = Mode.drag;
    // electronAPI.setModeDrag();
    alert('드래그 기능은 아직 구현되지 않았습니다!');
    updateUI();
});

btnScroll.addEventListener("click", (e) => {
    currentMode = Mode.scroll;
    electronAPI.setModeScroll();
    updateUI();
});

btnTeleport.addEventListener("click", (e) => {
    currentMode = Mode.teleport;
    electronAPI.setModeTeleport();
});
