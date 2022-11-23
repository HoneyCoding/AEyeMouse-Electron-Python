/** 해당 함수 실행 시 결과로 JSON이 return된다.
 *
 * 예를 들어 createKeyJson('click-left-mouse') 함수를 실행하면 JSON 타입인
 * { js: 'click-left-mouse-js', python: 'click-left-mouse-python' }가 return된다.
 *
 * 예를 들어 createKeyJson('click-left-mouse', ['js', 'C', 'C++']) 함수를 실행하면 JSON 타입인
 * { js: 'click-left-mouse-js', C: 'click-left-mouse-C', C++: 'click-left-mouse-C++' }가 return된다. */
function createKeyJson(key, languages = ["js", "python"]) {
    const keyJson = languages.reduce((prevJSON, item) => {
        const newJSON = { ...prevJSON };
        newJSON[item] = `${key}-${item}`;
        return newJSON;
    }, {});
    keyJson["key"] = key;
    return keyJson;
}

// Set Mode
const setModeDoubleClick = "set-mode-double-click";
const setModeRightClick = "set-mode-right-click";

// Drag
const showDragWindow = "show-drag-window";
const hideDragWindow = "hide-drag-window";
const dragMouse = "drag-mouse";

// Scroll
const showScrollWindow = "show-scroll-window";
const hideScrollWindow = "hide-scroll-window";
const scrollMouse = "scroll-mouse";

module.exports = {
    // Set Mode Function Keys
    setModeDoubleClick,
    setModeRightClick,

    // Show and Hide Window Function Keys
    showDragWindow,
    hideDragWindow,
    showScrollWindow,
    hideScrollWindow,

    // Drag, Scroll Mouse Function Keys
    dragMouse,
    scrollMouse,
};
