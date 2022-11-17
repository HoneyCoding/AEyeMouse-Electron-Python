const { spawn } = require("child_process");
const path = require("path");

const filePath = require("./filePath");

// spawn new child process to call the python script
let mousePy = runMousePy();

function runMousePy() {
    return spawn("python", [path.join(filePath.pythonPath, "drag.py")]);
}

// collect data from script
mousePy.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
});
// in close event we are sure that stream from child process is closed
mousePy.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    mousePy = runMousePy();
});
