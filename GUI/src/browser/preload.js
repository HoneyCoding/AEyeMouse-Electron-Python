
const { contextBridge, ipcRenderer } = require("electron");
const Keys = require('./keys');

function convertToCamelCase(key) {
    return key.split('-').map((word, index) => {
        if (index == 0) return word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
}

/**
 * JSON 타입
 */
const api = Object.values(Keys).reduce((prevJson, keyJson) => {
    const newJson = { ...prevJson };
    const functionName = convertToCamelCase(keyJson.key);
    newJson[functionName] = () => ipcRenderer.send(keyJson.js);
    return newJson;
}, {});

contextBridge.exposeInMainWorld("electronAPI", api);