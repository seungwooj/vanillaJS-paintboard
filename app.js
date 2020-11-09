/*
canvas : html5 element - able to manipulate pixels inside of the width&height of the canvas
you can control the canvas using the attributes of 'context' 
*/
const canvas = document.getElementById("js-Canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-Color");
const range = document.getElementById("js-Range");
const mode = document.getElementById("js-Mode");
const save = document.getElementById("js-Save");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5;

let painting = false;
let filling = false;

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
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    /*
    download : an attribute of "a" tag
    How to download image using canvasAPI ? -> "a html mdn download" search!
    */
    link.href = image;
    link.download = "yourPainting"
    link.click();
}

// Draw line on the canvas
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    // prevent rightclick on the image to save image
    canvas.addEventListener("contextmenu", handleCM);
}

// Create array of colors & add eventlistener inside the array
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

//Change the brush size
if(range) {
    range.addEventListener("input", handleRangeChange);
}

//Change between modes (filling & painting)
if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(save) {
    save.addEventListener("click", handleSaveClick);
}