// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, get, set, child, onChildAdded, onChildChanged, remove, onChildRemoved, update }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive, dbRefSetting } from "./config.js";
import {setLogData,} from "./log.js";
// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------

// マウス情報 Listener
function dragMoveListener (event) {
    let target = event.target
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    let key = target.getAttribute('id')

    let pos = {
        tag : "pos",
        id : key,
        posX : x,
        posY : y,
    }
    let newPostRef = push(dbRefInteract);
    set(newPostRef, pos);
}


// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener


interact('.LogContent')
.on('mouseover', function (event) {
    let target = event.target
    let tap_class = target.getAttribute('class')
    let focus = tap_class.split('LogContent LogContent')[1]+"FocusArrow";
    $("."+focus).toggleClass('Inactive')
    // console.log(focus);
})

.on('mouseout', function (event) {
    let target = event.target
    let tap_class = target.getAttribute('class')
    let focus = tap_class.split('LogContent LogContent')[1]+"FocusArrow";
    $("."+focus).toggleClass('Inactive')
    // console.log(focus);
})


// SpeechBalloonのInteract
interact('.SpeechBalloon')

// Drag
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


// Resize
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

    let size = {
        tag : "size",
        id : key,
        sizeW : w,
        sizeH : h,
        posX : x,
        posY : y
    }
    let newPostRef = push(dbRefInteract);
    set(newPostRef, size);
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


// Tap
.on('tap', function (event) {
    let target = event.target
    let tap_id = target.getAttribute('id')
    let tap_class = target.getAttribute('class')

    // SpeechBalloon : 吹き出しを押した時
    if (tap_class === "SpeechBalloon") {
        // $("."+tap_id+"ColorCircle").toggleClass('Inactive')
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
        $("."+tap_id+"TrashBtn").toggleClass('Inactive')
        event.preventDefault();


    // CheckBtn : 既読ボタンを押した時
    } else if (target.classList.contains('CheckBtn')) {
        let cc_id = target.closest(".SpeechBalloon").getAttribute('id');
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive');
        setCheckData(cc_id);
        event.preventDefault();


    // TrashBtn : 削除ボタンを押した時
    } else if (target.classList.contains('TrashBtn')) {
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
        $("."+tap_id+"SpeechBalloon").remove()
        removeChatData(tap_id);
        event.preventDefault();


    // EditBtn : 編集ボタンを押した時
    } else if (target.classList.contains('EditBtn')) {

        let html = $("."+tap_id+"Msg").html();
        let text = $("."+tap_id+"Msg").text();
        let rewrite_text = $("."+tap_id+"Msg").val();

        // SpeechBalloon上のテキストがpタグのみで構成されている場合（装飾がない時） / 編集可能
        if (html === text) {

            let tag_class = $("."+tap_id+"Msg").attr('class')

            // テキストが編集可能状態の時（テキスト部分のタグがtextareaの時）
            if ($("."+tap_id+"Msg").hasClass("Editable")) {

                // textarea => p
                $("."+tap_id+"Msg").replaceWith(function() {
                    $(this).replaceWith('<p class="'+tag_class+'">'+$(this).html()+'</p>')
                });

                $("."+tap_id+"Msg").toggleClass('Editable')
                $("."+tap_id+"EditBtn").css('background-color', '')
                $("."+tap_id+"EditBtn > .Hint").text("編集").css('width', '3rem')
                $("."+tap_id+"SpeechBalloon").css('pointer-events', 'all')

                updateChatData(tap_id, rewrite_text);
                setRewriteData(tap_id, rewrite_text);

            // テキストが編集不可状態の時（テキスト部分のタグがpタグの時）
            } else {

                // p => textarea
                $("."+tap_id+"Msg").replaceWith(function() {
                    $(this).replaceWith('<textarea class="'+tag_class+'">'+$(this).html()+'</textarea>')
                });

                $("."+tap_id+"Msg").toggleClass('Editable')
                $("."+tap_id+"EditBtn").css('background-color', 'rgba(192,231,197,1)')
                $("."+tap_id+"EditBtn > .Hint").text("編集可能").css('width', '4rem')
                $("."+tap_id+"SpeechBalloon").css('pointer-events', 'none') // textarea以外触れないようにする
                $("."+tap_id+"Msg").css('pointer-events', 'all')
                $("."+tap_id+"EditBtn").css('pointer-events', 'all')
            }

        // SpeechBalloon上のテキストがpタグのみで構成されていない場合（装飾がある時） / 編集不可
        } else {

            $("."+tap_id+"EditBtn").css('background-color', 'rgba(255,105,98,1)')
            $("."+tap_id+"EditBtn > .Hint").text("編集不可").css('width', '4rem')
            event.preventDefault();
        }

        event.preventDefault();

    // 編集可能状態の時にtextareaを押しても何も起こらないようにする（編集のみが可能なように）
    } else if (target.classList.contains('Editable')) {
        event.preventDefault();

    // Semantic SelectorBtn : セマンティックタグを出現させるボタンを押した時
    } else if (target.classList.contains('SemanticSelectorBtn')) {
        $("."+tap_id+"SelectorBtn").toggleClass('Inactive')
        $("."+tap_id+"SemanticCircle").toggleClass('Inactive')
        event.preventDefault();

    // Semantic Circle : セマンティックタグを押した時
    } else {
        let cc_id = target.closest(".SpeechBalloon").getAttribute('id');

        if (target.classList.contains('SemanticCircle')) {
            let sc_semantic = target.getAttribute('id');
            setSemanticData(cc_id, sc_semantic);
            $("."+cc_id+"SemanticCircle").toggleClass('Inactive')
            event.preventDefault();

        } else {
            $("."+cc_id+"SelectorBtn").toggleClass('Inactive')
            event.preventDefault();

            if (!$("."+cc_id+"SemanticCircle").hasClass("Inactive")) {
                $("."+cc_id+"SemanticCircle").toggleClass('Inactive')
            }
            // console.log(cc_id);
        }
    }
    // console.log(tap_class);
})

// ----------------------------------------------------------------------------------------------------> Method








// Firebase <----------------------------------------------------------------------------------------------------

// RealtimeDatabase "chat" のデータを更新 / "archive" に削除したデータをセット
function updateChatData(id, text) {
    const dbRefChatChild = ref(db, "chat/"+id);

    // archiveにデータをコピー
    get(dbRefChatChild).then((snapshot) => {
        const newPostRef = push(dbRefArchive);
        set(newPostRef, snapshot.val());
        setLogData("rewrite", snapshot.val().uname, snapshot.val().time, snapshot.val().text, snapshot.val().board, null, id); //　RealtimeDatabase "log" に編集データをセット
    });

    const date = new Date();
    const now = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);

    const msg = {
        time: now,
        text: text
    }

    update(dbRefChatChild, msg); // "chat"のデータを更新
}


// RealtimeDatabase "chat" のデータを削除 / "archive" に削除したデータをセット
function removeChatData(id) {
    const dbRefChatChild = ref(db, "chat/"+id);
    // console.log(dbRefChatChild.data.uname);

     // archiveにデータをコピー
    get(dbRefChatChild).then((snapshot) => {
        const newPostRef = push(dbRefArchive);
        set(newPostRef, snapshot.val());
        setLogData("removed", snapshot.val().uname, snapshot.val().time, snapshot.val().text, snapshot.val().board, null, id); // RealtimeDatabase "log" に削除データをセット
    });

    let removed = {
        tag : "removed",
        id : id
    }
    let newPostRef = push(dbRefInteract);
    set(newPostRef, removed);

    remove(dbRefChatChild); // "chat"の方のデータは削除
}


// RealtimeDatabase "interact" に編集されたチャットデータをセット
function setRewriteData(id, text) {
    const info = {
        tag : "rewrite",
        id : id,
        text : text,
    }
    let newPostRef = push(dbRefInteract);
    set(newPostRef, info);
}


// RealtimeDatabase "interact" にセマンティックデータをセット
function setSemanticData(id, semantic) {
    const date = new Date();
    const now = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);

    const info = {
        tag         : "semantic",
        id          : id,
        semantic    : semantic,
        uname       : $("."+id+"Name").text(),
        time        : now,
        board       : $(".Board.Active").attr('id')
    }
    let newPostRef = push(dbRefInteract); // ユニークキーを生成
    set(newPostRef, info);

    if (info.uname === "") { info.uname = "匿名"; } else {;}

    setLogData(info.tag, info.uname, info.time, null, info.board, info.semantic, info.id); // Log
}


// RealtimeDatabase "interact" に既読データをセット
function setCheckData(cc_id) {
    const info = {
        tag : "check",
        id : cc_id,
    }
    let newPostRef = push(dbRefInteract);
    set(newPostRef, info);
}




// RealTimeDatabase "interact" に要素が追加されたときに実行
onChildAdded(dbRefInteract,function(data) {
    const info = data.val();
    const key = data.key;

    // SpeechBalloonのDragした時
    if (info.tag === "pos") {

        $("#"+info.id).css('transform', 'translate(' + info.posX + 'px, ' + info.posY + 'px)')
        $("#"+info.id).attr({
            'data-x': info.posX,
            'data-y': info.posY
        })
        // console.log("pos");


    // SpeechBalloonのResizeした時
    } else if (info.tag === "size") {

        $("#"+info.id).css({
            'width': info.sizeW + 'px',
            'height': info.sizeH + 'px',
            'transform': 'translate(' + info.posX + 'px,' + info.posY + 'px)',
        })

        $("#"+info.id).attr({
            'data-x': info.posX,
            'data-y': info.posY
        })
        // console.log("size");


    // SpeechBalloonを削除した時
    } else if (info.tag === "removed") {

        // $("#"+info.id).css('display', 'none')
        $("#"+info.id).remove()


    // SpeechBalloonのテキストを編集した時
    } else if (info.tag === "rewrite") {
        $("."+info.id+"Msg").html(info.text)


    // SpeechBalloonのセマンティックタグを選択した時
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
                $("."+ info.id +"SpeechBalloon").css('background-color', 'rgba(192,231,197,.6)');

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
        // $("." + info.id + "SpeechBalloon").css('border', 'none');
        // console.log("semantic");


    // SpeechBalloonを既読にした時
    } else if (info.tag === "check") {
        $("."+ info.id +"SpeechBalloon").css('border', 'solid 1px black');

    } else {;}

});

// ----------------------------------------------------------------------------------------------------> Firebase