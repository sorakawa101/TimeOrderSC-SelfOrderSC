// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved, update }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, } from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------

function updateChatData(id) {
    const dbRefChatChild = ref(db, "chat/"+id);

    const date = new Date();
    // const now = date.getMonth()+1 + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    // const now = ("0"+(date.getMonth()+1)).slice(-2) + "/" + ("0"+date.getDate()).slice(-2) + " " + ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);
    const now = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);


    const msg = {
        tag : "rewrite",
        uname : $("#uname").val(),
        time: now,
        // text : $("#text").val()
        // text : tinyMCE.get("text").getContent({format: "text"})
        text: tinyMCE.get("text").getContent()
    }
    // const newPostRef = push(dbRefChat); // ユニークキーを生成
    update(dbRefChatChild, msg);
}

function removeChatData(id) {
    const dbRefChatChild = ref(db, "chat/"+id);
    remove(dbRefChatChild);
}


let rewrite_id = [];

function rewrite_get(id) {

    $("#uname").val($("."+id+"Name").text())
    tinyMCE.get("text").setContent($("."+id+"Msg").text())
    $("#rewrite-btn").toggleClass("Inactive")

    let flag = $("#rewrite-btn").hasClass("Inactive")
    if (flag) {
        $("#uname").css('margin', '10px 250px 10px 10px')
    } else {
        $("#uname").css('margin', '10px 130px 10px 10px')
    }

    rewrite_id.push(id);
}


$("#rewrite-btn").on("click", function() {

    // Case. text=""
    if (tinyMCE.get("text").getContent() === "") {
        return 0;
    }
    // rewrite_set(rewrite_id[0]);
    updateChatData(rewrite_id[0]);
    rewrite_id.pop();
});


function setSemanticData(cc_id, sc_semantic) {
    const date = new Date();
    const now = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);

    let semantic = {
        tag : "semantic",
        id : cc_id,
        semantic : sc_semantic,
        uname : "user", // ベタ書き
        time : now
    }
    let newPostRef = push(dbRefInteract); // ユニークキーを生成
    set(newPostRef, semantic);
}


function genSemanticLog(uname, semantic, time, rgba) {
    // SemanticLog
    let semanticLogContent = $("<div>", {class: 'LogContent'})
    let txt = $("<p>", {text: uname+"から"+semantic+"があります"}).appendTo(semanticLogContent)
    $("<span>", {text: "●  "}).css({'color':rgba, 'font-size':'.5rem'}).prependTo(txt)
    $("<p>", {text: time}).appendTo(semanticLogContent)
    $(".Log").append(semanticLogContent)
}

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

    // console.log(tap_id);
    // console.log(tap_class);

    // tap SpeechBalloon
    if (tap_class === "SpeechBalloon") {
        // $("."+tap_id+"ColorCircle").toggleClass('Inactive')
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
        event.preventDefault();

    // } else if (target.classList.contains('ColorSelectorBtn')) {
    //     $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
    //     // $("."+tap_id+"ColorCircle").toggleClass('Inactive')
    //     event.preventDefault();

    // tap EditBtn
    } else if (target.classList.contains('EditBtn')) {

        let flag = $(".InputWrapper").hasClass("Inactive");
        if (flag) {
            $(".InputWrapper").toggleClass('Inactive');
        } else {;}

        $("."+tap_id+"SelectorBtn").toggleClass('Inactive');
        rewrite_get(tap_id);
        event.preventDefault();

    // tap SemanticSelectorBtn
    } else if (target.classList.contains('SemanticSelectorBtn')) {
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
        $("."+tap_id+"SemanticCircle").toggleClass('Inactive')
        event.preventDefault();

    // tap TrashBtn
    } else if (target.classList.contains('TrashBtn')) {
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
        // $("."+tap_id+"SpeechBalloon").toggleClass('Inactive') // 一旦隠す
        $("."+tap_id+"SpeechBalloon").remove()
        removeChatData(tap_id); // 再読み込みしないと消えない
        event.preventDefault();

    } else {
        let cc_id = target.closest(".SpeechBalloon").getAttribute('id');

        if (target.classList.contains('SemanticCircle')) {
            let sc_semantic = target.getAttribute('id');
            setSemanticData(cc_id, sc_semantic);
            $("."+cc_id+"SemanticCircle").toggleClass('Inactive')
            event.preventDefault();

        } else {
            // $("."+cc_id+"ColorCircle").toggleClass('Inactive')
            $("."+cc_id+"SelectorBtn").toggleClass('Inactive')
            event.preventDefault();

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

        $("#"+info.id).css('transform', 'translate(' + info.posX + 'px, ' + info.posY + 'px)')
        $("#"+info.id).attr({
            'data-x': info.posX,
            'data-y': info.posY
        })
        // // console.log("pos");

    } else if (info.tag === "size") {

        $("#"+info.id).css({
            'width': info.sizeW + 'px',
            'height': info.sizeH + 'px',
            'transform': 'translate(' + info.posX + 'px,' + info.posY + 'px)',
            'border': "solid 1px #000"
        })

        $("#"+info.id).attr({
            'data-x': info.posX,
            'data-y': info.posY
        })
        // console.log("size");

    } else if (info.tag === "semantic") {

        switch (info.semantic) {
            case "none":
                $("."+ info.id +"Semantic").text(" ");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(227,228,232,.6)');
                break;
            case "idea":
                $("."+ info.id +"Semantic").text("<提案>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(255,105,98,.6)');
                genSemanticLog(info.uname, "提案", info.time, 'rgba(255,105,98,.8)');
                break;
            case "facilitation":
                $("."+ info.id +"Semantic").text("<進行>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(136,196,228,.6)');
                genSemanticLog(info.uname, "進行", info.time, 'rgba(136,196,228,.8)');
                break;
            case "question":
                $("."+ info.id +"Semantic").text("<質疑>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(255,175,104,.6)');
                genSemanticLog(info.uname, "質疑", info.time, 'rgba(255,175,104,.8)');
                break;
            case "answer":
                $("."+ info.id +"Semantic").text("<応答>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(192,231,197,.6)');
                genSemanticLog(info.uname, "応答", info.time, 'rgba(192,231,197,.8)');

                break;
            case "comment":
                $("."+ info.id +"Semantic").text("<感想>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(246,230,131,.6)');
                genSemanticLog(info.uname, "感想", info.time, 'rgba(246,230,131,.8)');
                break;
            case "information":
                $("."+ info.id +"Semantic").text("<連絡>");
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(151,150,188,.6)');
                genSemanticLog(info.uname, "連絡", info.time, 'rgba(151,150,188,.8)');
                break;
            default:
                ;
        }

        $("." + info.id + "SpeechBalloon").css('min-width', '210px');
        // console.log("semantic");

    } else {;}

});

// ----------------------------------------------------------------------------------------------------> Interact