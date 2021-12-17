// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, get, set, child, onChildAdded, onChildChanged, remove, onChildRemoved, update }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { db, member, dbRefInteract, dbRefInteract1, dbRefInteract2, dbRefInteract3, dbRefInteract4, dbRefInteract5, dbRefInteract6, dbRefArchive } from "./config.js";
import { setLogData, } from "./log.js";
import { getNow, getUsernameFromInput, getUsernameFromSet, getUsernameFromSpeechBalloon, setResultData } from "./script.js";
// ----------------------------------------------------------------------------------------------------> Import




// Interact <----------------------------------------------------------------------------------------------------

// // マウス情報 Listener
// function dragMoveListener (event) {
//     let target = event.target
//     let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
//     let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
//     let key = target.getAttribute('id')

//     let pos = {
//         tag     : "pos",
//         user    : getUsernameFromSet(),
//         id      : key,
//         posX    : x,
//         posY    : y,
//     }
//     let newPostRef = push(dbRefInteract);
//     set(newPostRef, pos);
// }


// // this function is used later in the resizing and gesture demos
// window.dragMoveListener = dragMoveListener


interact('.LogContent')
.on('mouseover', function (event) {
    let target = event.target
    let hover_class = target.getAttribute('class')
    let focus = hover_class.split('LogContent LogContent')[1]; // 対応するSpeechBalloonのID
    $("#"+focus+" .FocusArrow").toggleClass('Inactive')
    // console.log(focus);
})

.on('mouseout', function (event) {
    let target = event.target
    let hover_class = target.getAttribute('class')
    let focus = hover_class.split('LogContent LogContent')[1]; // 対応するSpeechBalloonのID
    $("#"+focus+" .FocusArrow").toggleClass('Inactive')
    // console.log(focus);
})


// SpeechBalloonのInteract
interact('.SpeechBalloon')

// Drag
// .draggable({
//     inertia: true,
//     modifiers: [
//     interact.modifiers.restrictRect({
//         restriction: 'parent',
//         endOnly: true
//     })
//     ],
//     autoScroll: true,
//     // dragMoveListener from the dragging demo above
//     listeners: { move: dragMoveListener}
// })


// Resize
// .resizable({

// // resize from all edges and corners
// edges: { left: true, right: true, bottom: true, top: true },

// listeners: {
//     move (event) {
//     let target = event.target
//     let x = (parseFloat(target.getAttribute('data-x')) || 0)
//     let y = (parseFloat(target.getAttribute('data-y')) || 0)
//     let w = event.rect.width
//     let h = event.rect.height
//     let key = target.getAttribute('id')

//     // translate when resizing from top or left edges
//     x += event.deltaRect.left
//     y += event.deltaRect.top

//     let size = {
//         tag     : "size",
//         user    : getUsernameFromSet(),
//         id      : key,
//         sizeW   : w,
//         sizeH   : h,
//         posX    : x,
//         posY    : y
//     }
//     let newPostRef = push(dbRefInteract);
//     set(newPostRef, size);
//     }
// },

// modifiers: [
//     // keep the edges inside the parent
//     interact.modifiers.restrictEdges({
//     outer: 'parent'
//     }),

//     // minimum size
//     interact.modifiers.restrictSize({
//     min: { width: 100, height: 50 }
//     })
// ],

// inertia: true
// })


// MouseDown
.on('mousedown', function (event) {
    let target = event.target;
    let tap_id = target.closest(".SpeechBalloon").getAttribute('id');

    if ($("#"+tap_id+" .SelectorBtn").hasClass('Inactive') && $("#"+tap_id+" .SemanticCircle").hasClass('Inactive')) {

        let mouse = {
            tag     : "mousedown",
            who     : getUsernameFromSet(),
            user    : getUsernameFromSet(),
            id      : tap_id
        }

        const user = getUsernameFromSet();
        const dbRef = ref(db, user+'/self-order/interact/mousedown');

        const newPostRef = push(dbRef);
        set(newPostRef, mouse);
        setResultData(user, "mousedown");
        setResultData(user, "mouse");

    }

})


// MouseUp
.on('mouseup', function (event) {
    let target = event.target;
    let tap_id = target.closest(".SpeechBalloon").getAttribute('id');

    if ($("#"+tap_id+" .SelectorBtn").hasClass('Inactive') && $("#"+tap_id+" .SemanticCircle").hasClass('Inactive')) {

        let mouse = {
            tag     : "mouseup",
            who     : getUsernameFromSet(),
            user    : getUsernameFromSet(),
            id      : tap_id
        }

        const user = getUsernameFromSet();
        const dbRef = ref(db, user+'/self-order/interact/mouseup');

        const newPostRef = push(dbRef);
        set(newPostRef, mouse);
        setResultData(user, "mouseup");
        setResultData(user, "mouse");

    }
})


// Tap
.on('tap', function(event) {
    let target = event.target;
    let tap_id = target.getAttribute('id'); // SpeechBalloonのID
    let tap_closest_id = target.closest(".SpeechBalloon").getAttribute('id'); // タップした要素の親要素のSpeechBalloonのID
    let tap_class = target.getAttribute('class').split(' ')[0]; // タップした要素の１つ目のクラス

    // console.log(tap_id);
    // console.log(tap_closest_id);
    // console.log(tap_class);

    switch (tap_class) {

        case "SpeechBalloon":

            if (!$("#"+tap_id+" .SemanticCircle").hasClass('Inactive')) {
                $("#"+tap_id+" .SemanticCircle").toggleClass('Inactive')
            }

            $("#"+tap_id+" .SelectorBtn").toggleClass('Inactive')

            event.preventDefault();
            break;

        case "CheckBtn":
            $("#"+tap_id+" .SelectorBtn").toggleClass('Inactive')
            setCheckData(tap_id);
            event.preventDefault();
            break;

        case "TrashBtn":
            let trash_user = getUsernameFromSet();
            let trashed_user = getUsernameFromSpeechBalloon(tap_id);
            $("#"+tap_id+" .SelectorBtn").toggleClass('Inactive')
            removeChatData(tap_id, trash_user, trashed_user);
            event.preventDefault();
            break;

        case "EditBtn":
            let html = $("#"+tap_id+" .Msg").html();
            let text = $("#"+tap_id+" .Msg").text();
            let rewrite_text = $("#"+tap_id+" .Msg").val();
            let edit_user = getUsernameFromSet();
            let edited_user = getUsernameFromSpeechBalloon(tap_id);

            if (html === text) {

                let tag_class = $("#"+tap_id+" .Msg").attr('class')

                // テキストが編集可能状態の時（テキスト部分のタグがtextareaの時）
                if($("#"+tap_id+" .Msg").hasClass("Editable")) {

                    // textarea => p
                    $("#"+tap_id+" .Msg").replaceWith(function() {
                        $(this).replaceWith('<p class="'+tag_class+'">'+$(this).html()+'</p>')
                    })

                    $("#"+tap_id+" .Msg").toggleClass('Editable')
                    $("#"+tap_id+" .EditBtn").css('background-color', '')
                    $("#"+tap_id+" .EditBtn > .Hint").text("編集").css('width', '3rem')
                    $("#"+tap_id).css('pointer-events', 'all')

                    updateChatData(tap_id, rewrite_text, edit_user, edited_user);
                    setRewriteData(tap_id, rewrite_text);

                // テキストが編集不可状態の時（テキスト部分のタグがpタグの時）
                } else {

                    // p => textarea
                    $("#"+tap_id+" .Msg").replaceWith(function() {
                        $(this).replaceWith('<textarea class="'+tag_class+'">'+$(this).html()+'</textarea>')
                    })

                    $("#"+tap_id+" .Msg").toggleClass('Editable')
                    $("#"+tap_id+" .EditBtn").css('background-color', 'rgba(192,231,197,1)')
                    $("#"+tap_id+" .EditBtn > .Hint").text("編集可能").css('width', '3rem')
                    $("#"+tap_id).css('pointer-events', 'none')
                    $("#"+tap_id+" .Msg").css('pointer-events', 'all')
                    $("#"+tap_id+" .EditBtn").css('pointer-events', 'all')
                }

            } else {
                $("#"+tap_id+" .EditBtn").css('background-color', 'rgba(255,105,98,1)')
                $("#"+tap_id+" .EditBtn > .Hint").text("編集不可").css('width', '3rem')
                event.preventDefault();
            }
            break;

        case "SemanticSelectorBtn":
            $("#"+tap_id+" .SelectorBtn").toggleClass('Inactive')
            $("#"+tap_id+" .SemanticCircle").toggleClass('Inactive')
            event.preventDefault();
            break;

        case "SemanticCircle":
            setSemanticData(tap_closest_id, tap_id); // ここのtap_idはSemanticCircleのidを指す
            $("#"+tap_closest_id+" .SemanticCircle").toggleClass('Inactive')
            event.preventDefault();

        default:
            event.preventDefault();
    }

})

// ----------------------------------------------------------------------------------------------------> Interact








// Method <----------------------------------------------------------------------------------------------------

function onChildAddedMethod(info) {

    // SpeechBalloonをdrag/resizeしている時
    if (info.tag === "mousedown") {

        if (info.user !== $("#set-username").val()) {
            $("#"+info.id+" .Who").text(info.who)
            $("#"+info.id+" .Who").removeClass('Inactive')
        }


    // SpeechBalloonをdrag/resizeし終わって離した時
    } else if (info.tag === "mouseup") {

        $("#"+info.id+" .Who").text(info.who)
        $("#"+info.id+" .Who").addClass('Inactive')


    // tinymceの入力欄にフォーカスしている時
    } else if (info.tag === "focusin") {

        $(".WritingNotify").text('"'+info.who+'"が入力中…')
        $(".WritingNotify").removeClass('Inactive')


    // tinymceの入力欄からフォーカスを外した時
    } else if (info.tag === "focusout") {

        $(".WritingNotify").addClass('Inactive')


    // SpeechBalloonを削除した時
    } else if (info.tag === "removed") {

        // $("#"+info.id).css('display', 'none')
        $("#"+info.id).remove()


    // SpeechBalloonのテキストを編集した時
    } else if (info.tag === "rewrite") {
        $("#"+info.id+" .Msg").html(info.text)


    // SpeechBalloonのセマンティックタグを選択した時
    } else if (info.tag === "semantic") {

        switch (info.semantic) {
            case "none":
                $("#"+info.id+" .Semantic").text(" ");
                $("#"+info.id).css('background-color', 'rgba(227,228,232,.6)');
                break;
            case "important":
                $("#"+info.id+" .Semantic").text("<重要>");
                $("#"+info.id).css('background-color', 'rgba(255,105,98,.6)');
                break;
            case "facilitation":
                $("#"+info.id+" .Semantic").text("<進行>");
                $("#"+info.id).css('background-color', 'rgba(136,196,228,.6)');
                break;
            case "question":
                $("#"+info.id+" .Semantic").text("<質疑>");
                $("#"+info.id).css('background-color', 'rgba(255,175,104,.6)');
                break;
            case "response":
                $("#"+info.id+" .Semantic").text("<応答>");
                $("#"+info.id).css('background-color', 'rgba(192,231,197,.6)');

                break;
            case "note":
                $("#"+info.id+" .Semantic").text("<メモ>");
                $("#"+info.id).css('background-color', 'rgba(246,230,131,.6)');
                break;
            case "answer":
                $("#"+info.id+" .Semantic").text("<解答>");
                $("#"+info.id).css('background-color', 'rgba(151,150,188,.6)');
                break;
            default:
                ;
        }

        $("#"+info.id).css('min-width', '210px');
        // $("#"+info.id).css('border', 'none');
        // console.log("semantic");


    // SpeechBalloonを既読にした時
    } else if (info.tag === "check") {
        $("#"+info.id).css('border', 'solid 1px black');

    } else {;}
}

// ----------------------------------------------------------------------------------------------------> Method








// Firebase <----------------------------------------------------------------------------------------------------

// RealtimeDatabase "chat" のデータを更新 / "archive" に削除したデータをセット
function updateChatData(id, text, edit_user, edited_user) {
    const dbRefChatChild = ref(db, edited_user+"/time-order/chat/"+id);

    // archiveにデータをコピー
    get(dbRefChatChild).then((snapshot) => {
        const newPostRef = push(dbRefArchive);
        set(newPostRef, snapshot.val());
        setLogData("rewrite", edit_user, snapshot.val().time, snapshot.val().text, snapshot.val().board, null, id); // RealtimeDatabase "log" に編集データをセット
    });

    const msg = {
        tag  : "edited",
        time : getNow(),
        text : text,
        user : edit_user
    }

    update(dbRefChatChild, msg); // "chat"のデータを更新
}


// RealtimeDatabase "chat" のデータを削除 / "archive" に削除したデータをセット
function removeChatData(id, remove_user, removed_user) {
    const dbRefChatChild = ref(db, removed_user+"/time-order/chat/"+id);
    // console.log(dbRefChatChild.data.uname);

     // archiveにデータをコピー
    get(dbRefChatChild).then((snapshot) => {
        const newPostRef = push(dbRefArchive);
        set(newPostRef, snapshot.val());
        setLogData("removed", remove_user, snapshot.val().time, snapshot.val().text, snapshot.val().board, null, id); // RealtimeDatabase "log" に削除データをセット
    });

    let removed = {
        tag     : "removed",
        user    : remove_user,
        id      : id
    }

    const dbRef = ref(db, remove_user+'/time-order/interact/delete');

    const newPostRef = push(dbRef);
    set(newPostRef, removed);
    setResultData(remove_user, "delete");
    setResultData(remove_user, "interact");

    remove(dbRefChatChild); // "chat"の方のデータは削除
}


// RealtimeDatabase "interact" に編集されたチャットデータをセット
function setRewriteData(id, text) {
    const info = {
        tag     : "rewrite",
        user    : getUsernameFromSet(),
        id      : id,
        text    : text,
    }

    const user = getUsernameFromSet();
    const dbRef = ref(db, user+'/time-order/interact/edit');

    const newPostRef = push(dbRef);
    set(newPostRef, info);
    setResultData(user, "edit");
    setResultData(user, "interact");
}


// RealtimeDatabase "interact" にセマンティックデータをセット
function setSemanticData(id, semantic) {
    const date = new Date();
    const now = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);

    const info = {
        tag         : "semantic",
        id          : id,
        semantic    : semantic,
        uname       : getUsernameFromInput(),
        user        : getUsernameFromSet(),
        time        : getNow(),
        board       : $(".Board.Active").attr('id')
    }

    const user = getUsernameFromSet();
    const dbRef = ref(db, user+'/time-order/interact/semantic');

    const newPostRef = push(dbRef);
    set(newPostRef, info);
    setResultData(user, "semantic");
    setResultData(user, semantic);

    if (info.uname === "") { info.uname = "匿名"; } else {;}

    setLogData(info.tag, info.user, info.time, null, info.board, info.semantic, info.id); // Log
}


// RealtimeDatabase "interact" に既読データをセット
function setCheckData(id) {
    const info = {
        tag     : "check",
        user    : getUsernameFromSet(),
        id      : id,
    }

    const user = getUsernameFromSet();
    const dbRef = ref(db, user+'/time-order/interact/check');

    const newPostRef = push(dbRef);
    set(newPostRef, info);
    setResultData(user, "check");
    setResultData(user, "interact");
}


function onChildChildAdded(dbRefInteractPath) {

    onChildAdded(ref(db, dbRefInteractPath+'/check'), function(data) {
        const check_info = data.val();
        onChildAddedMethod(check_info);
    });

    onChildAdded(ref(db, dbRefInteractPath+'/delete'), function(data) {
        const delete_info = data.val();
        onChildAddedMethod(delete_info);
    });

    onChildAdded(ref(db, dbRefInteractPath+'/edit'), function(data) {
        const edit_info = data.val();
        onChildAddedMethod(edit_info);
    });

    onChildAdded(ref(db, dbRefInteractPath+'/semantic'), function(data) {
        const edit_info = data.val();
        onChildAddedMethod(edit_info);
    });

    onChildAdded(ref(db, dbRefInteractPath+'/focusin'), function(data) {
        const focusin_info = data.val();
        onChildAddedMethod(focusin_info);
    });

    onChildAdded(ref(db, dbRefInteractPath+'/focusout'), function(data) {
        const focusout_info = data.val();
        onChildAddedMethod(focusout_info);
    });

    onChildAdded(ref(db, dbRefInteractPath+'/mousedown'), function(data) {
        const mousedown_info = data.val();
        onChildAddedMethod(mousedown_info);
    });

    onChildAdded(ref(db, dbRefInteractPath+'/mouseup'), function(data) {
        const mouseup_info = data.val();
        onChildAddedMethod(mouseup_info);
    });
}




// RealTimeDatabase "interact" に要素が追加されたときに実行

onChildAdded(dbRefInteract,function() {
    const dbRefInteractPath = 'undefined/time-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract1,function() {
    const dbRefInteractPath = member[0]+'/time-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract2,function() {
    const dbRefInteractPath = member[1]+'/time-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract3,function() {
    const dbRefInteractPath = member[2]+'/time-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract4,function() {
    const dbRefInteractPath = member[3]+'/time-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract5,function() {
    const dbRefInteractPath = member[4]+'/time-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract6,function() {
    const dbRefInteractPath = member[5]+'/time-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


// ----------------------------------------------------------------------------------------------------> Firebase