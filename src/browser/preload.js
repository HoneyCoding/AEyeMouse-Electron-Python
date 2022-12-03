const { contextBridge, ipcRenderer } = require("electron");

const Keys = require("../common/keys");
const functions = require("../common/functions");

const emptyString = "";

contextBridge.exposeInMainWorld("electronAPI", {
    // Set Mode Functions
    setModeDoubleClick() {
        ipcRenderer.send(Keys.setModeDoubleClick, emptyString);
    },
    setModeRightClick() {
        ipcRenderer.send(Keys.setModeRightClick, emptyString);
    },

    // Show and Hide Window Functions
    closeMainWindow() {
        ipcRenderer.send(Keys.closeMainWindow, emptyString);
    },
    showDragWindow() {
        ipcRenderer.send(Keys.showDragWindow, emptyString);
    },
    hideDragWindow() {
        ipcRenderer.send(Keys.hideDragWindow, emptyString);
    },
    showScrollWindow() {
        ipcRenderer.send(Keys.showScrollWindow, emptyString);
    },
    hideScrollWindow() {
        ipcRenderer.send(Keys.hideScrollWindow, emptyString);
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
