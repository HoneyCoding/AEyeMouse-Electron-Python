const path = require('path');

const rootPath = path.join(process.env.PWD);

const srcPath = path.join(rootPath, 'src');
const pythonPath = path.join(rootPath, 'python');

const browserPath = path.join(srcPath, 'browser');
const commonPath = path.join(srcPath, "common");
const rendererPath = path.join(srcPath, "renderer");

const rendererMainPath = path.join(rendererPath, 'main');
const rendererDragPath = path.join(rendererPath, "drag");

module.exports = {
    rootPath,
    srcPath,
    pythonPath,
    browserPath,
    commonPath,
    rendererPath,
    rendererMainPath,
    rendererDragPath
};