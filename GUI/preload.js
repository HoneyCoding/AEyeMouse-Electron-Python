
const { contextBridge, ipcRenderer } = require("electron");
const Keys = require('./keys');

/**
 * JSON 타입
 */
const api = Object.values(Keys).reduce((prevJson, keyJson) => {
    const newJson = { ...prevJson };
    newJson[keyJson.key] = () => ipcRenderer.send(keyJson.js);
    return newJson;
}, {});

contextBridge.exposeInMainWorld("electronAPI", api);