/*
canvas : html5 element - able to manipulate pixels inside of the width&height of the canvas
you can control the canvas using the attributes of 'context' 
*/
const canvas = document.getElementById("js-Canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-Color");
const range = document.getElementById("js-Range");

canvas.width = 600;
canvas.height = 600;
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 5;

let painting = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        //everytime I move the pointer while not painting, the coords change
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        //everytime I move the pointer while painting, I create line and I stroke the line
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

// Draw line on the canvas
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

// Create array of colors & add eventlistener inside the array
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

//Change the brush size
if(range) {
    range.addEventListener("input", handleRangeChange)
}
