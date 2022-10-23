
// const topLeftPin = document.getElementById("top-left-pin");
// const bottomRightPin = document.getElementById("bottom-right-pin");
const container = document.getElementById('container');
const pinElements = document.getElementsByClassName('pin-img');
const pinArea = document.getElementById("pin-area");
const clickable = document.getElementById("clickable");

let points = [];

let pinAreaPoints = { topLeftX: 0, topLeftY: 0, bottomRightX: 0, bottomRightY: 0 };

let clickCount = 0;

container.addEventListener('click', function(e) {
    if (clickCount >= 2 && !clickable.contains(e.target)) {
        electronAPI.hideDragWindow();
        return;
    }

    const clickedX = e.clientX;
    const clickedY = e.clientY;

    setPinPoint(clickCount, clickedX, clickedY);
    clickCount++;

    if (clickCount === 2) {
        setPinArea();
    }
});

clickable.addEventListener("click", function (e) {
    const { topLeftX, topLeftY, bottomRightX, bottomRightY } = pinAreaPoints;
    electronAPI.dragMouse(topLeftX, topLeftY, bottomRightX, bottomRightY);
});

function setPinPoint(pinIndex, x, y) {
    const pin = pinElements[pinIndex];
    // pin image의 top, left 좌표 계산
    const top = y - pin.height;
    const left = x;

    // pin Element의 css style 지정
    pin.style.cssText = `top: ${top}px; left: ${left}px`;
    pin.classList.remove('opacity-0');
    pin.classList.add('opacity-1');

    points[pinIndex] = { x, y };
}

function setPinArea() {
    const xArray = [];
    const yArray = [];

    for (const {x, y} of points) {
        xArray.push(x);
        yArray.push(y);
    }
    
    const topLeftX = Math.min(...xArray);
    const topLeftY = Math.min(...yArray);
    const bottomRightX = Math.max(...xArray);
    const bottomRightY = Math.max(...yArray);

    pinAreaPoints = { topLeftX, topLeftY, bottomRightX, bottomRightY };

    const left = topLeftX;
    const top = topLeftY;
    const width = bottomRightX - topLeftX;
    const height = bottomRightY - topLeftY;

    showPinArea();
    pinArea.style.cssText = `top: ${top}px; left: ${left}px; width: ${width}px; height: ${height}px;`;
}

function showPinArea() {
    pinArea.classList.remove('d-none');
    pinArea.classList.add('d-block');
}

function hidePinArea() {
    pinArea.classList.remove("d-block");
    pinArea.classList.add("d-none");
}

// electronAPI.setTopLeftPinListener(function (x, y) {
//     topLeftX = x;
//     topLeftY = y;

//     // pinArea.style = '';
//     pinArea.style = '';
//     topLeftPin.style = `top: ${topLeftX}px; left: ${topLeftY}px;`;
// });

// electronAPI.setBottomRightPinListener(function (x, y) {
//     bottomRightX = x;
//     bottomRightY = y;
//     bottomRightPin.style = `bottom: ${bottomRightX}px; right: ${bottomRightY}px; opacity: 1;`;
// });