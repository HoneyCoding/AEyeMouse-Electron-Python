/** 해당 함수 실행 시 결과로 JSON이 return된다.
 * 
 * 예를 들어 createKeyJson('click-left-mouse') 함수를 실행하면
 * { js: 'click-left-mouse-js', python: 'click-left-mouse-python' }가 return된다. 
 * 
 * 예를 들어 createKeyJson('click-left-mouse', ['js', 'C', 'C++']) 함수를 실행하면
 * { js: 'click-left-mouse-js', C: 'click-left-mouse-C', C++: 'click-left-mouse-C++' }가 return된다. */
function createKeyJson(key, languages = ["js", "python"]) {
    const keyJson = languages.reduce((prevJSON, item) => {
        const newJSON = { ...prevJSON };
        newJSON[item] = `${key}-${item}`;
        return newJSON;
    }, {});
    keyJson['key'] = key;
    return keyJson;
}

const setModeLeftClick = createKeyJson('set-mode-left-click');
const setModeRightClick = createKeyJson("set-mode-right-click");
const setModeDrag = createKeyJson("set-mode-drag");
const setModeTeleport = createKeyJson("set-mode-teleport");
const setModeScroll = createKeyJson('set-mode-scroll');

module.exports = {
    setModeLeftClick,
    setModeRightClick,
    setModeDrag,
    setModeScroll,
    setModeTeleport
};
