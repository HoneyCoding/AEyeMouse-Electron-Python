const { spawn } = require("child_process");
const path = require("path");

const filePath = require("./filePath");

const runPython = new Promise((resolve, reject) => {
    const python = spawn("python", [
        path.join(filePath.pythonPath, "drag-scroll.py"),
    ]);

    python.stdout.on("data", (data) => {
        resolve(data);
    });

    python.stderr.on("data", (data) => {
        reject(data);
    });

    python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });
});

module.exports = runPython;
