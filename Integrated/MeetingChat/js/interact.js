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

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
const db = getDatabase(app); // RealTimeDatabaseに接続
const dbRefChat = ref(db, "chat");
const dbRefInteract = ref(db, "interact");

// ----------------------------------------------------------------------------------------------------> Firebase Config




// Method <----------------------------------------------------------------------------------------------------
let rewrite_id = [];

// function rewrite_get(id) {
//     $("#uname").val($("."+id+"Name").text())
//     tinyMCE.get("text").setContent($("."+id+"Msg").text())
//     $("#rewrite-btn").toggleClass("Inactive")
//     $("#uname").css('margin', '10px 130px 10px 10px')
//     rewrite_id.push(id);
//     event.preventDefault();
// }

// function rewrite_set(id) {
//     $("."+id+"Name").text($("#uname").val())
//     $("."+id+"Msg").text(tinyMCE.get("text").getContent())
//     $("#rewrite-btn").toggleClass("Inactive")
//     $("#uname").css('margin', '10px 250px 10px 10px')
//     rewrite_id.pop();

//     // 送信したら入力されたテキストを削除
//     let textForm = document.getElementById("uname");
//         textForm.value = '';
//         tinyMCE.get("text").setContent('');
// }

// $("#rewrite-btn").on("click", function() {
//     rewrite_set(rewrite_id[0]);
// });

// ----------------------------------------------------------------------------------------------------> Method




// Interact <----------------------------------------------------------------------------------------------------

function dragMoveListener (event) {
    let target = event.target
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    let key = target.getAttribute('id')

    // <-- firebase
    let pos = {
        tag : "pos",
        id : key,
        posX : x,
        posY : y,
    }
    let newPostRef = push(dbRefInteract); // ユニークキーを生成
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
    let target = event.target
    let x = (parseFloat(target.getAttribute('data-x')) || 0)
    let y = (parseFloat(target.getAttribute('data-y')) || 0)
    let w = event.rect.width
    let h = event.rect.height
    let key = target.getAttribute('id')

    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    // <-- firebase
    let size = {
        tag : "size",
        id : key,
        sizeW : w,
        sizeH : h,
        posX : x,
        posY : y
    }
    let newPostRef = push(dbRefInteract); // ユニークキーを生成
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


.on('tap', function (event) {
    let target = event.target
    let tap_id = target.getAttribute('id')
    let tap_class = target.getAttribute('class')

    console.log(tap_id);
    console.log(tap_class);

    if (tap_class === "SpeechBalloon") {
        // $("."+tap_id+"ColorCircle").toggleClass('Inactive')
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
        event.preventDefault();

    // } else if (target.classList.contains('ColorSelectorBtn')) {
    //     $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
    //     // $("."+tap_id+"ColorCircle").toggleClass('Inactive')
    //     event.preventDefault();
    } else if (target.classList.contains('EditBtn')) {
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
        // rewrite_get(tap_id);
        event.preventDefault();
    } else if (target.classList.contains('SemanticSelectorBtn')) {
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
        $("."+tap_id+"SemanticCircle").toggleClass('Inactive')
        event.preventDefault();
    } else if (target.classList.contains('TrashBtn')) {
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
        $("."+tap_id+"SpeechBalloon").css('display', 'none');
        // remove(dbRefChat, tap_id);
        event.preventDefault();
    } else {
        let cc_id = target.closest(".SpeechBalloon").getAttribute('id');

        // if (target.classList.contains('ColorCircle')) {
        //     let cc_color = target.getAttribute('id');
        //     let color = {
        //         tag : "color",
        //         id : cc_id,
        //         color : cc_color
        //     }
        //     let newPostRef = push(dbRefInteract); // ユニークキーを生成
        //     set(newPostRef, color);
        //     $("."+cc_id+"ColorCircle").toggleClass('Inactive')
        //     event.preventDefault();

        if (target.classList.contains('SemanticCircle')) {
            let sc_semantic = target.getAttribute('id');
            let semantic = {
                tag : "semantic",
                id : cc_id,
                semantic : sc_semantic
            }
            let newPostRef = push(dbRefInteract); // ユニークキーを生成
            set(newPostRef, semantic);
            $("."+cc_id+"SemanticCircle").toggleClass('Inactive')
            event.preventDefault();

        } else {
            // $("."+cc_id+"ColorCircle").toggleClass('Inactive')
            $("."+cc_id+"SelectorBtn").toggleClass('Inactive')
            event.preventDefault();

            // if (!$("."+cc_id+"ColorCircle").hasClass("Inactive")) {
            //     $("."+cc_id+"ColorCircle").toggleClass('Inactive')
            // }
            if (!$("."+cc_id+"SemanticCircle").hasClass("Inactive")) {
                $("."+cc_id+"SemanticCircle").toggleClass('Inactive')
            }
            // console.log(cc_id);
        }
    }
})

// RealTimeDatabaseに新しい要素が追加された時に実行
onChildAdded(dbRefInteract,function(data) {
    const info = data.val();
    const key = data.key; // ユニークキーを取得

    // document.getElementById(info.id).style.border = "solid 1px #000";

    if (info.tag === "pos") {
        document.getElementById(info.id).style.transform = 'translate(' + info.posX + 'px, ' + info.posY + 'px)';
        document.getElementById(info.id).setAttribute('data-x', info.posX);
        document.getElementById(info.id).setAttribute('data-y', info.posY);
        // console.log("pos");

    } else if (info.tag === "size") {
        document.getElementById(info.id).style.width = info.sizeW + 'px';
        document.getElementById(info.id).style.height = info.sizeH + 'px';
        document.getElementById(info.id).style.transform = 'translate(' + info.posX + 'px,' + info.posY + 'px)';
        document.getElementById(info.id).setAttribute('data-x', info.posX);
        document.getElementById(info.id).setAttribute('data-y', info.posY);
        document.getElementById(info.id).style.border = "solid 1px #000";
        // console.log("size");

    // } else if (info.tag === "color") {

    //     switch(info.color) {
    //         case "black":
    //             // document.getElementById(info.id).style.backgroundColor = "black";
    //             document.getElementById(info.id).classList.toggle('Inactive');
    //             break;
    //         case "tomato":
    //             document.getElementById(info.id).style.backgroundColor = "tomato";
    //             break;
    //         case "darkturquoise":
    //             document.getElementById(info.id).style.backgroundColor = "darkturquoise";
    //             break;
    //         case "gold":
    //             document.getElementById(info.id).style.backgroundColor = "gold";
    //             break;
    //         case "mediumseagreen":
    //             document.getElementById(info.id).style.backgroundColor = "mediumseagreen";
    //             break;
    //         case "gainsboro":
    //             document.getElementById(info.id).style.backgroundColor = "gainsboro";
    //             break;
    //         default:
    //             ;
    //         //     console.log("status");
    //     }
        // console.log("status");
    } else if (info.tag === "semantic") {

        switch (info.semantic) {
            case "none":
                $("."+ info.id +"Semantic").text(" ");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(227,228,232,.6)');
                break;
            case "idea":
                $("."+ info.id +"Semantic").text("<提案>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(255,105,98,.6)');
                break;
            case "facilitation":
                $("."+ info.id +"Semantic").text("<進行>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(136,196,228,.6)');
                break;
            case "question":
                $("."+ info.id +"Semantic").text("<質疑>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(255,175,104,.6)');
                break;
            case "answer":
                $("."+ info.id +"Semantic").text("<応答>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(192,231,197,.8)')
                break;
            case "comment":
                $("."+ info.id +"Semantic").text("<感想>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(246,230,131,.6)');
                break;
            case "information":
                $("."+ info.id +"Semantic").text("<連絡>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(151,150,188,.6)');
                break;
            default:
                ;
        }
        $("." + info.id + "SpeechBalloon").css('min-width', '210px');
    } else {;}
});

// ----------------------------------------------------------------------------------------------------> Interact


