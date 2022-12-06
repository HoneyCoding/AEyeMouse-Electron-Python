const container = document.getElementById("container");
const rectangle = document.getElementById("rectangle");

const width = 80;
const height = 180;

function drawRectangle(x, y) {
    // rectangle.style.display = 'block';
    rectangle.style.width = `${width}px`;
    rectangle.style.height = `${height}px`;
    rectangle.style.top = `${y}px`;
    rectangle.style.left = `${x}px`;
}

container.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    drawRectangle(x, y);
});

container.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    electronAPI.moveScrollWindow(x, y);
});