// Modules to control application life and create native browser window
const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");
const { io } = require("socket.io-client");

const Keys = require("../common/keys");
const filePath = require("../common/filePath");

require(path.join(filePath.commonPath, 'runPython'));

let mainWindow = null;
let dragWindow = null;

const socket = io("http://localhost:5000");

function createWindow() {
    // Create the browser window.
    createMainWindow();
    setupIPCSockets();

    // and load the index.html of the app.

    // openDevTools();
}

function createMainWindow() {
    if (mainWindow !== null) return;

    // Create a window that fills the screen's available work area.
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width: displayWidth, height: displayHeight } =
        primaryDisplay.workAreaSize;

    const mainWindowWidth = 300;
    const mainWindowHeight = 600;

    const mainWindowX = parseInt((displayWidth - mainWindowWidth) * 0.9);
    const mainWindowY = parseInt((displayHeight - mainWindowHeight) * 0.8);
    // const mainWindowX = 1400;
    // const mainWindowY = 400;

    mainWindow = new BrowserWindow({
        x: mainWindowX,
        y: mainWindowY,
        width: mainWindowWidth,
        height: mainWindowHeight,
        alwaysOnTop: true,
        titleBarStyle: "hidden-inset",
        transparent: true,
        resizable: false,
        visibleOnAllWorkspaces: true,
        fullscreen: false,
        frame: false,
        webPreferences: {
            preload: path.join(filePath.browserPath, "preload.js"),
        },
    });

    const htmlPath = path.join(filePath.rendererMainPath, "index.html");

    mainWindow.loadFile(htmlPath);
    // mainWindow.setIgnoreMouseEvents(true);
    // mainWindow.maximize();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

function createDragWindow() {
    if (dragWindow !== null) return;

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    dragWindow = new BrowserWindow({
        width,
        height,
        resizable: false,
        movable: false,
        fullscreenable: false,
        focusable: false,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            preload: path.join(filePath.browserPath, "preload.js"),
        },
    });

    dragWindow.loadFile(path.join(filePath.rendererDragPath, "index.html"));
    dragWindow.on("closed", () => {
        dragWindow = null;
    });
}

function openDevTools() {
    if (mainWindow !== null) mainWindow.webContents.openDevTools();
    if (dragWindow !== null) dragWindow.webContents.openDevTools();
}

function setupIPCSockets() {
    // Object.values(Keys).map((keyJson) => setupIPCSocket(keyJson));

    ipcMain.on(Keys.dragMouse, (event, arg) => {
        if (dragWindow !== null) {
            dragWindow.close();
        }
        socket.emit(Keys.dragMouse, arg, (err, res) => {
            console.log(`res from python: ${res}`);
        });
    });

    ipcMain.on(Keys.showDragWindow, (event, arg) => {
        if (dragWindow === null) {
            createDragWindow();
        }
    });

    ipcMain.on(Keys.hideDragWindow, (event, arg) => {
        if (dragWindow !== null) {
            dragWindow.close();
        }
    });
}

function setupIPCSocket(key) {
    ipcMain.on(key.js, (event, arg) => {
        socket.emit(key.python, arg, (err, res) => {
            console.log(`res from python: ${res}`);
        });
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
