var canvas = document.getElementById("drawArea");
var ctx = canvas.getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;
var x = 0, y = 0;
var color = "#000000";
var line = 8;
canvas.width = width;
canvas.height = height - 34;

canvas.addEventListener("mousedown", touchStartHandler, false);
canvas.addEventListener("mouseup", touchEndHandler, false);

canvas.addEventListener("touchstart", ttouchStartHandler, false);
canvas.addEventListener("touchend", ttouchEndHandler, false);

function touchStartHandler(e) {
	e.preventDefault();
	getTouchPoint(e);
	ctx.beginPath();
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.moveTo(x, y);
	canvas.addEventListener("mousemove", touchMoveHandler, false);
}

function touchMoveHandler(e) {
	e.preventDefault();
	getTouchPoint(e);
	ctx.lineWidth = line; //線の太さ
	ctx.strokeStyle = color; //線の色
	ctx.lineTo(x, y);
	ctx.stroke();
}

function touchEndHandler(e) {
	e.preventDefault();
	ctx.closePath();
	canvas.removeEventListener("mousemove", touchMoveHandler, false);
}

function getTouchPoint(e) {
	x = e.clientX - canvas.offsetLeft;
	y = e.clientY - canvas.offsetTop;
}

function ttouchStartHandler(e) {
	e.preventDefault();
	getTTouchPoint(e);
	ctx.beginPath();
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.moveTo(x, y);
	canvas.addEventListener("touchmove", ttouchMoveHandler, false);
}

function ttouchMoveHandler(e) {
	e.preventDefault();
	getTTouchPoint(e);
	ctx.lineWidth = line; //線の太さ
	ctx.strokeStyle = color; //線の色
	ctx.lineTo(x, y);
	ctx.stroke();
}

function ttouchEndHandler(e) {
	e.preventDefault();
	ctx.closePath();
	canvas.removeEventListener("touchmove", ttouchMoveHandler, false);
}

function getTTouchPoint(e) {
	var touch = e.touches[0];
	x = touch.pageX - canvas.offsetLeft;
	y = touch.pageY - canvas.offsetTop;
}

function spread() {
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function clr() {
	cntx = canvas.getContext("2d");
	cntx.clearRect(0, 0, canvas.width, canvas.height);
}

function change_black() {
	color = "#000000";
}
function change_red() {
	color = "#ff0000";
}
function change_green() {
	color = "#008000";
}
function change_blue() {
	color = "#0000ff";
}
function change_yellow() {
	color = "#ffff00";
}
function change_white() {
	color = "#ffffff";
}
function change_8() {
	line = 8;
}
function change_16() {
	line = 16;
}
