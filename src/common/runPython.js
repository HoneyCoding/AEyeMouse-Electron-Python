const { spawn } = require("child_process");
const path = require("path");

const filePath = require("./filePath");

const createRunPythonPromise = (fileName) =>
    new Promise((resolve, reject) => {
        const python = spawn("python", [
            path.join(filePath.pythonPath, fileName),
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

const runPython = () =>
    createRunPythonPromise("control_mouse.py").then(() =>
        createRunPythonPromise("keyboard_control.py")
    );

module.exports = runPython;
