// Firebase Config <----------------------------------------------------------------------------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1e7dTQDCTEKfrNTSyWb63V-s408nqN_o",
    authDomain: "research-project-dad15.firebaseapp.com",
    projectId: "research-project-dad15",
    storageBucket: "research-project-dad15.appspot.com",
    messagingSenderId: "760369282337",
    appId: "1:760369282337:web:47ab3f3ebf3ca4a43b1260"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
const db = getDatabase(app); // RealTimeDatabaseに接続
const dbRefChat = ref(db, "chat");
const dbRefInteract = ref(db, "interact");
const dbRefCanvas = ref(db, "canvas");

// ----------------------------------------------------------------------------------------------------> Firebase Config




// Canvas <----------------------------------------------------------------------------------------------------

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");
let start_background_color = "rgba(227,228,232,.0)";
context.globalCompositeOperation = 'source-over';
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

// function get_data() {
//     // <-- firebase
//     let image_data = context.getImageData(0, 0, canvas.width, canvas.height);
//     let draw = {
//         tag : "draw",
//         img : image_data
//     }
//     let newPostRef = push(dbRefCanvas); // ユニークキーを生成
//     set(newPostRef, draw);
//     // firebase -->
// }


const range = document.getElementById("range");


function change_color(element) {
    draw_color = element;
    context.globalCompositeOperation = 'source-over';
}

$(".ColorField").on("click", function() {
    change_color($(this).css('background-color'));
});


function change_weight(element) {
    draw_width = element;
}

$(".EraserS").on("click", function() {
    context.globalCompositeOperation = 'destination-out';
    // change_color(start_background_color);
    change_weight(20);
});

$(".EraserM").on("click", function() {
    context.globalCompositeOperation = 'destination-out';
    // change_color(start_background_color);
    change_weight(50);
});

$(".EraserL").on("click", function() {
    context.globalCompositeOperation = 'destination-out';
    // change_color(start_background_color);
    change_weight(100);
});

function change_range_val(element) {
    range.value = element;
}

$(".PenWeight").on("click", function() {
    change_range_val($(this).val());
    change_weight($(this).val());
});

$(".PenWeightBtnS").on("click", function() {
    change_range_val(1);
    change_weight(1);
});

$(".PenWeightBtnL").on("click", function() {
    change_range_val(10);
    change_weight(10);
});


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
    // get_data();
}

function clear_canvas() {
    undo_data_stack.push(context.getImageData(0, 0, canvas.width, canvas.height));

    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
}

$("#clear").on("click", function() {
    clear_canvas();
});

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

$("#undo").on("click", function() {
    undo_last();
});

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

$("#redo").on("click", function() {
    redo_last();
});

// ----------------------------------------------------------------------------------------------------> Canvas

onChildAdded(dbRefInteract,function(data) {
    const draw = data.val();
    const key = data.key; // ユニークキーを取得

    // console.log("addChild");
});