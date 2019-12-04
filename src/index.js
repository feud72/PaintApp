const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const penWidth = document.getElementById("jsPenWidth");
const opacity = document.getElementById("jsOpacity");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clear = document.getElementById("jsClear");
const INITIAL_COLOR = "rgb(44, 44, 44)";
const INITIAL_ALPHA = "0.3";

let painting = false;
let filling = false;
let transparency = INITIAL_ALPHA;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.globalAlpha = transparency;

function stopPainting() {
  painting = false;
}

function startPainting() {
  ctx.beginPath();
  painting = true;
}

function onMouseMove(event) {
  const x =
    event.offsetX ||
    event.touches[0].pageX - event.touches[0].target.offsetLeft;
  const y =
    event.offsetY || event.touches[0].pageY - event.touches[0].target.offsetTop;
  if (!painting) {
    ctx.moveTo(x, y);
  } else if (!filling) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const strokeSize = event.target.value;
  ctx.lineWidth = strokeSize;
  const text = document.getElementById("jsPenWidthText");
  text.innerText = String(ctx.lineWidth).substr(0, 3);
}

function handleOpacityChange(event) {
  transparency = event.target.value;
  ctx.globalAlpha = transparency;
  const text = document.getElementById("jsOpacityText");
  text.innerText = String(ctx.globalAlpha);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "현재 모드 : 펜";
  } else {
    filling = true;
    mode.innerText = "현재 모드 : 채우기";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function handleClearClick() {
  const color = ctx.fillStyle;
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.globalAlpha = transparency;
}

function handleCM(event) {
  event.preventDefault();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  const date = new Date().getTime();
  link.href = image;
  link.download = `PaintApp_${date}.png`;
  console.log(link);
  link.click();
}

if (canvas) {
  canvas.addEventListener("touchstart", startPainting);
  canvas.addEventListener("touchend", stopPainting);
  canvas.addEventListener("touchmove", onMouseMove);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
  Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );
}

if (penWidth) {
  penWidth.addEventListener("input", handleRangeChange);
}

if (opacity) {
  opacity.addEventListener("input", handleOpacityChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}

if (clear) {
  clear.addEventListener("click", handleClearClick);
}
