const { contextBridge, ipcRenderer } = require("electron");

const Keys = require("../common/keys");
const functions = require("../common/functions");

function convertToCamelCase(key) {
    return key
        .split("-")
        .map((word, index) => {
            if (index == 0) return word.toLowerCase();
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join("");
}

/**
 * JSON 타입
 */
const api = Object.values(Keys.setMode).reduce((prevJson, keyJson) => {
    const newJson = { ...prevJson };
    const functionName = convertToCamelCase(keyJson.key);
    newJson[functionName] = () => ipcRenderer.send(keyJson.js);
    return newJson;
}, {});

contextBridge.exposeInMainWorld("electronAPI", {
    // Set Mode Functions
    setModeDoubleClick() {
        ipcRenderer.send(Keys.setModeDoubleClick, "");
    },
    setModeRightClick() {
        ipcRenderer.send(Keys.setModeRightClick, "");
    },

    // Show and Hide Window Functions
    showDragWindow() {
        ipcRenderer.send(Keys.showDragWindow, "");
    },
    hideDragWindow() {
        ipcRenderer.send(Keys.hideDragWindow, "");
    },
    showScrollWindow() {
        ipcRenderer.send(Keys.showScrollWindow, "");
    },
    hideScrollWindow() {
        ipcRenderer.send(Keys.hideScrollWindow, "");
    },

    // Drag, Scroll Mouse Functions
    dragMouse(fromX, fromY, toX, toY) {
        ipcRenderer.send(
            Keys.dragMouse,
            functions.encodeString(fromX, fromY, toX, toY)
        );
    },
    scrollMouse(direction) {
        ipcRenderer.send(Keys.scrollMouse, direction);
    },
});
