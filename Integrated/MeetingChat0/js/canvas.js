// Canvas <----------------------------------------------------------------------------------------------------

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;


let undo_data_stack = [];
let redo_data_stack = [];
let init_flag = false;

function before_draw() {
    redo_data_stack = [];
    undo_data_stack.push(context.getImageData(0, 0, canvas.width, canvas.height));
}


const range = document.getElementById("range");


function change_color(element) {
    draw_color = element.style.background;
}

function change_range_val(element) {
    range.value = element;
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function start(event) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
                    event.clientY - canvas.offsetTop);
    event.preventDefault();

    before_draw();
}

function draw(event) {
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft,
                        event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
}

function stop(event) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();
}

function clear_canvas() {
    undo_data_stack.push(context.getImageData(0, 0, canvas.width, canvas.height));

    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function undo_last() {
    if (undo_data_stack.length <= 0) {
        return;
    } else {
        redo_data_stack.push(context.getImageData(0, 0, canvas.width, canvas.height));

        let undo_img = undo_data_stack.pop();
        context.putImageData(undo_img, 0, 0);
    }
    // console.log(undo_data_stack);
    // console.log(redo_data_stack);
}

function redo_last() {
    if (redo_data_stack.length <= 0) {
        return;
    } else {
        undo_data_stack.push(context.getImageData(0, 0, canvas.width, canvas.height));

        let redo_img = redo_data_stack[redo_data_stack.length-1];
        context.putImageData(redo_img, 0, 0);
        redo_data_stack.pop();
    }
    // console.log(undo_data_stack);
    // console.log(redo_data_stack);
}

// ----------------------------------------------------------------------------------------------------> Canvas
