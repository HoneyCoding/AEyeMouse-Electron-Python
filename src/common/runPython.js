const { spawn } = require("child_process");
const path = require("path");

const filePath = require("./filePath");

const runPython = () => new Promise((resolve, reject) => {
    const python = spawn("python", [
        path.join(filePath.pythonPath, "drag-scroll.py"),
    ]);

    python.stdout.on("data", (data) => {
        const dataToString = `python: ${data.toString()}`;
        resolve(dataToString);
    });

    python.stderr.on("data", (data) => {
        const dataToString = `python: ${data.toString()}`;
        reject(dataToString);
    });

    python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });
});

module.exports = runPython;
