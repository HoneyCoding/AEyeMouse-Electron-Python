const path = require("path");

const rootPath = path.join(process.cwd());

const srcPath = path.join(rootPath, "src");
const pythonPath = path.join(rootPath, "python");

const browserPath = path.join(srcPath, "browser");
const commonPath = path.join(srcPath, "common");
const rendererPath = path.join(srcPath, "renderer");
const resourcesPath = path.join(srcPath, "resources");

const rendererMainPath = path.join(rendererPath, "main");
const rendererDragPath = path.join(rendererPath, "drag");
const rendererMoveMainPath = path.join(rendererPath, "move-main");
const rendererMoveScrollPath = path.join(rendererPath, "move-scroll");
const rendererLoadingPath = path.join(rendererPath, "loading");
const rendererScrollPath = path.join(rendererPath, "scroll");
const rendererScrollButtonsPath = path.join(rendererPath, "scroll-buttons");

module.exports = {
    rootPath,
    srcPath,
    pythonPath,
    browserPath,
    commonPath,
    rendererPath,
    resourcesPath,
    rendererMainPath,
    rendererMoveScrollPath,
    rendererDragPath,
    rendererMoveMainPath,
    rendererLoadingPath,
    rendererScrollPath,
    rendererScrollButtonsPath,
};
