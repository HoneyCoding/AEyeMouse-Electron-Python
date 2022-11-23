const { contextBridge, ipcRenderer } = require("electron");

const Keys = require("../common/keys");
const functions = require("../common/functions");

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
