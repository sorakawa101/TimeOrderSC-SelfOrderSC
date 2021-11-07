// Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDI7oQ7ZkuMjSPx4bRVgk6EX0hdqnczOq8",
    authDomain: "interact-eb5ea.firebaseapp.com",
    databaseURL: "https://interact-eb5ea-default-rtdb.firebaseio.com",
    projectId: "interact-eb5ea",
    storageBucket: "interact-eb5ea.appspot.com",
    messagingSenderId: "250513903298",
    appId: "1:250513903298:web:a4c04d163fccd2051fb55b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // RealTimeDatabaseに接続
const dbRef = ref(db, "interact");

// <-- Interact

function dragMoveListener (event) {
    let target = event.target
    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    // target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // // update the position attributes
    // target.setAttribute('data-x', x)
    // target.setAttribute('data-y', y)

    // <-- firebase
    let pos = {
        tag : "pos",
        posX : x,
        posY : y,
    }
    let newPostRef = push(dbRef); // ユニークキーを生成
    set(newPostRef, pos);
    // firebase -->
}


// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener


interact('.SpeechBalloon')
.draggable({
    inertia: true,
    modifiers: [
    interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
    })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener}
})

.resizable({
// resize from all edges and corners
edges: { left: true, right: true, bottom: true, top: true },

listeners: {
    move (event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0)
    var y = (parseFloat(target.getAttribute('data-y')) || 0)
    var w = event.rect.width
    var h = event.rect.height

    // update the element's style
    // target.style.width = event.rect.width + 'px'
    // target.style.height = event.rect.height + 'px'
    // target.style.width = w + 'px'
    // target.style.height = h + 'px'

    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    // target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

    // target.setAttribute('data-x', x)
    // target.setAttribute('data-y', y)
    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)

    // <-- firebase
    let size = {
        tag : "size",
        sizeW : w,
        sizeH : h,
        posX : x,
        posY : y
    }
    let newPostRef = push(dbRef); // ユニークキーを生成
    set(newPostRef, size);
    // firebase -->
    }
},
modifiers: [
    // keep the edges inside the parent
    interact.modifiers.restrictEdges({
    outer: 'parent'
    }),

    // minimum size
    interact.modifiers.restrictSize({
    min: { width: 100, height: 50 }
    })
],

inertia: true
})

// Interact -->

// <-- Status

// <-- Color
$(".ColorCircle").on("click", function() {
    // switch($(this).attr("id")) {
    //     case "black":
    //         $("#sb").css('display','none');
    //         break;
    //     case "pink":
    //         $("#sb").css('background-color', "#f67690");
    //         break;
    //     case "yellow":
    //         $("#sb").css('background-color', "#f9e900");
    //         break;
    //     case "orange":
    //             $("#sb").css('background-color', "#f5a500");
    //             break;
    //     case "green":
    //         $("#sb").css('background-color', "#92cb97");
    //         break;
    //     case "white":
    //         $("#sb").css('background-color', "#dedede");
    //         break;
    //     default:
    //         ;
    // }
    let status = {
        tag : "status",
        color : $(this).attr("id")
    }
    let newPostRef = push(dbRef); // ユニークキーを生成
    set(newPostRef, status);
});
// Color -->

// Status -->


// RealTimeDatabaseに新しい要素が追加された時に実行
onChildAdded(dbRef,function(data) {
    const info = data.val();
    const key = data.key; // ユニークキーを取得

    if (info.tag === "pos") {
        document.getElementById("sb").style.transform = 'translate(' + info.posX + 'px, ' + info.posY + 'px)';
        document.getElementById("sb").setAttribute('data-x', info.posX);
        document.getElementById("sb").setAttribute('data-y', info.posY);
    } else if (info.tag === "size") {
        document.getElementById("sb").style.width = info.sizeW + 'px';
        document.getElementById("sb").style.height = info.sizeH + 'px';
        document.getElementById("sb").style.transform = 'translate(' + info.posX + 'px,' + info.posY + 'px)';
        document.getElementById("sb").setAttribute('data-x', info.posX);
        document.getElementById("sb").setAttribute('data-y', info.posY);
        document.getElementById("sb").style.border = "solid 1px #000";

    } else if (info.tag === "status") {
        switch(info.color) {
            case "black":
                $("#sb").css('display','none');
                break;
            case "pink":
                $("#sb").css('background-color', "#f67690");
                break;
            case "yellow":
                $("#sb").css('background-color', "#f9e900");
                break;
            case "orange":
                    $("#sb").css('background-color', "#f5a500");
                    break;
            case "green":
                $("#sb").css('background-color', "#92cb97");
                break;
            case "white":
                $("#sb").css('background-color', "#dedede");
                break;
            default:
                ;
        }
    } else {;}
});