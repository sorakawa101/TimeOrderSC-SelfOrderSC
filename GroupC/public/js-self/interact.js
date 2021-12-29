// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, get, set, child, onChildAdded, onChildChanged, remove, onChildRemoved, update }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { db, member, dbRefInteract, dbRefInteract1, dbRefInteract2, dbRefInteract3, dbRefInteract4, dbRefInteract5, dbRefInteract6, dbRefInteract7, dbRefInteract8, dbRefArchive, dbRefRecorderEvalResult } from "./config.js";
import { setLogData, } from "./log.js";
import { getNow, getUsernameFromInput, getUsernameFromSet, getUsernameFromSpeechBalloon, getChatTextFromSpeechBalloon, setResultData } from "./script.js";

// ----------------------------------------------------------------------------------------------------> Import




// Interact <----------------------------------------------------------------------------------------------------

// マウス情報 Listener
function dragMoveListener (event) {
    let target = event.target
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    let key = target.getAttribute('id')

    let pos = {
        tag     : "pos",
        user    : getUsernameFromSet(),
        id      : key,
        posX    : x,
        posY    : y,
    }

    const user = getUsernameFromSet();
    const dbRef = ref(db, user+'/self-order/interact/pos');

    const newPostRef = push(dbRef);
    set(newPostRef, pos);
    // setResultData(user, "pos");
}


// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener


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
    listeners: {
        move: dragMoveListener,
        // call this function on every dragend event
        end (event) {
            let variation = Math.floor(Math.sqrt(Math.pow(event.pageX - event.x0, 2) + Math.pow(event.pageY - event.y0, 2) | 0));
            const user = getUsernameFromSet();
            setResultData(user, "pos", variation);
            setResultData(user, "variation", variation);
            // console.log(distance);
        }
    }

})


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

//     const user = getUsernameFromSet();
//     const dbRef = ref(db, user+'/self-order/interact/resize');

//     let newPostRef = push(dbRef);
//     set(newPostRef, size);

//     let variation = Math.floor(Math.round(event.rect.width) + Math.round(event.rect.height));
//     setResultData(user, "resize", variation);
//     setResultData(user, "variation", variation);
//     },
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
    let pre_semantic = $("#"+tap_closest_id+" .Semantic").text();

    // console.log(tap_id);
    // console.log(tap_closest_id);
    // console.log(tap_class);

    switch (tap_class) {

        case "SpeechBalloon":

            if (!$("#"+tap_id+" .SemanticCircle").hasClass('Inactive')) {
                $("#"+tap_id+" .SemanticCircle").toggleClass('Inactive')
            }
            if (!$("#"+tap_id+" .EvalCircle").hasClass('Inactive')) {
                $("#"+tap_id+" .EvalCircle").toggleClass('Inactive')
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
            // console.log(tap_id);
            event.preventDefault();
            break;

        case "SemanticCircle":
            setSemanticData(tap_closest_id, tap_id, pre_semantic); // ここのtap_idはSemanticCircleのidを指す
            $("#"+tap_closest_id+" .SemanticCircle").toggleClass('Inactive')
            // console.log(pre_semantic);
            event.preventDefault();
            break;

        case "EvalSelectorBtn":
            $("#"+tap_id+" .SelectorBtn").toggleClass('Inactive')
            $("#"+tap_id+" .EvalCircle").toggleClass('Inactive')
            event.preventDefault();
            break;

        case "EvalCircle":
            setEvalForChatData(tap_closest_id, tap_id, getUsernameFromSet()); // ここのtap_idはEvalCircleのidを指す
            setEvalData(tap_closest_id, tap_id);
            $("#"+tap_closest_id+" .EvalCircle").toggleClass('Inactive')
            // console.log(tap_id.split('recorder-point')[1]);
            event.preventDefault();
            break;

        default:
            event.preventDefault();
    }

})

// ----------------------------------------------------------------------------------------------------> Interact








// Method <----------------------------------------------------------------------------------------------------

function onChildAddedMethod(info) {
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


    // SpeechBalloonをdrag/resizeしている時
    } else if (info.tag === "mousedown") {

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
                $("#"+info.id).css({'background-color': 'rgba(227,228,232,.6)', 'border': 'none'});
                break;
            case "important":
                switch (info.pre_semantic) {
                    case "<進行>":
                        $("#"+info.id+" .Semantic").text("<重要進行>");
                        $("#"+info.id).css({'border': '5px solid rgba(255,105,98,.6)', 'min-width': '250px'});
                        break;
                    case "<質疑>":
                        $("#"+info.id+" .Semantic").text("<重要質疑>");
                        $("#"+info.id).css({'border': '5px solid rgba(255,105,98,.6)', 'min-width': '250px'});
                        break;
                    case "<応答>":
                        $("#"+info.id+" .Semantic").text("<重要応答>");
                        $("#"+info.id).css({'border': '5px solid rgba(255,105,98,.6)', 'min-width': '250px'});
                        break;
                    case "<メモ>":
                        $("#"+info.id+" .Semantic").text("<重要メモ>");
                        $("#"+info.id).css({'border': '5px solid rgba(255,105,98,.6)', 'min-width': '250px'});
                        break;
                    case "<解答>":
                        $("#"+info.id+" .Semantic").text("<重要解答>");
                        $("#"+info.id).css({'border': '5px solid rgba(255,105,98,.6)', 'min-width': '250px'});
                        break;
                    default:
                        $("#"+info.id+" .Semantic").text("<重要>");
                        $("#"+info.id).css({'background-color': 'rgba(255,105,98,.6)', 'min-width': '210px', 'border': 'none'});
                        break;
                }
                break;
            case "facilitation":
                $("#"+info.id+" .Semantic").text("<進行>");
                $("#"+info.id).css({'background-color': 'rgba(136,196,228,.6)', 'border': 'none'});
                break;
            case "question":
                $("#"+info.id+" .Semantic").text("<質疑>");
                $("#"+info.id).css({'background-color': 'rgba(255,175,104,.6)', 'border': 'none'});
                break;
            case "response":
                $("#"+info.id+" .Semantic").text("<応答>");
                $("#"+info.id).css({'background-color': 'rgba(192,231,197,.6)', 'border': 'none'});

                break;
            case "note":
                $("#"+info.id+" .Semantic").text("<メモ>");
                $("#"+info.id).css({'background-color': 'rgba(246,230,131,.6)', 'border': 'none'});
                break;
            case "answer":
                $("#"+info.id+" .Semantic").text("<解答>");
                $("#"+info.id).css({'background-color': 'rgba(151,150,188,.6)', 'border': 'none'});
                break;
            default:
                ;
        }

        if (info.semantic !== "important") { $("#"+info.id).css('min-width', '210px'); }
        // $("#"+info.id).css('border', 'none');
        // console.log("semantic");


    // SpeechBalloonを既読にした時
    } else if (info.tag === "check") {
        $("#"+info.id).css('border', 'solid 1px black');


    // SpeechBalloonに点数を付けた時
    } else if (info.tag === "eval") {

        if (info.user === getUsernameFromSet()) {
        // $("#"+info.id+" .EvalBtn").html(info.eval)
        $("#"+info.id+" .EvalBtn").css('display', 'inline')

        switch (info.eval) {
            case "useful":
                $("#"+info.id+" .EvalBtn").css('background-color', 'rgba(246,230,131,.6)')
                break;
            case "useless":
                $("#"+info.id+" .EvalBtn").css('background-color', 'rgba(151,150,188,.6)')
                break;
            default:;
        }
        }

    } else {;}
}

// ----------------------------------------------------------------------------------------------------> Method








// Firebase <----------------------------------------------------------------------------------------------------

// RealtimeDatabase "chat" のデータを更新 / "archive" に削除したデータをセット
function updateChatData(id, text, edit_user, edited_user) {
    const dbRefChatChild = ref(db, edited_user+"/self-order/chat/"+id);

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
    const dbRefChatChild = ref(db, removed_user+"/self-order/chat/"+id);
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

    const dbRef = ref(db, remove_user+'/self-order/interact/delete');

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
    const dbRef = ref(db, user+'/self-order/interact/edit');

    const newPostRef = push(dbRef);
    set(newPostRef, info);
    setResultData(user, "edit");
    setResultData(user, "interact");
}


// RealtimeDatabase "interact" にセマンティックデータをセット
function setSemanticData(id, semantic, pre_semantic) {
    const date = new Date();
    const now = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);

    const info = {
        tag             : "semantic",
        id              : id,
        semantic        : semantic,
        pre_semantic    : pre_semantic,
        uname           : getUsernameFromInput(),
        user            : getUsernameFromSet(),
        time            : getNow(),
        board           : $(".Board.Active").attr('id')
    }

    const user = getUsernameFromSet();
    const dbRef = ref(db, user+'/self-order/interact/semantic');

    const newPostRef = push(dbRef);
    set(newPostRef, info);
    setResultData(user, "semantic");

    if (semantic === "important") {
        switch (pre_semantic) {
            case "<進行>":
                setResultData(user, "important_facilitation");
                break;
            case "<質疑>":
                setResultData(user, "important_question");
                break;
            case "<応答>":
                setResultData(user, "important_response");
                break;
            case "<メモ>":
                setResultData(user, "important_note");
                break;
            case "<解答>":
                setResultData(user, "important_answer");
                break;
            default:
                setResultData(user, "important");
                break;
        }
    }
    if (semantic !== "important") { setResultData(user, semantic); }

    if (info.uname === "") { info.uname = "匿名"; } else {;}

    setLogData(info.tag, info.user, info.time, null, info.board, info.semantic, info.id); // Log
}


// RealtimeDatabase "recorder-point" にチャットの有用性を評価した得点をセット
function setEvalForChatData(id, eval_result, user) {

    const info = {
        tag    : "eval",
        eval   : eval_result,
        id     : id
    }

    if (user === "安岡" || user === "小林" || user === "小川" || user === "笹川") {
        remove(ref(db, "Eval/self-order/Recorder/"+user+'/useful/'+getChatTextFromSpeechBalloon(id)+'  '+id));
        remove(ref(db, "Eval/self-order/Recorder/"+user+'/useless/'+getChatTextFromSpeechBalloon(id)+'  '+id));

        const dbRef = ref(db, "Eval/self-order/Recorder/"+user+'/'+eval_result+'/'+getChatTextFromSpeechBalloon(id)+'  '+id);
        set(dbRef, info);
    } else if (user === "出口" || user === "永井" || user === "名執" || user === "東川") {
        const dbRef = ref(db, "Eval/self-order/Rater/"+user+'/'+eval_result+'/'+getChatTextFromSpeechBalloon(id)+'  '+id);
        set(dbRef, info);
    }
}

// RealtimeDatabase "interact" にポイントデータをセット
function setEvalData(id, point) {
    const info = {
        tag             : "eval",
        id              : id,
        eval            : point,
        uname           : getUsernameFromInput(),
        user            : getUsernameFromSet(),
        time            : getNow(),
        board           : $(".Board.Active").attr('id')
    }

    const user = getUsernameFromSet();
    const dbRef = ref(db, user+'/self-order/interact/eval');

    const newPostRef = push(dbRef);
    set(newPostRef, info);
}


// RealtimeDatabase "interact" に既読データをセット
function setCheckData(id) {
    const info = {
        tag     : "check",
        user    : getUsernameFromSet(),
        id      : id,
    }

    const user = getUsernameFromSet();
    const dbRef = ref(db, user+'/self-order/interact/check');

    const newPostRef = push(dbRef);
    set(newPostRef, info);
    setResultData(user, "check");
    setResultData(user, "interact");
}


function onChildChildAdded(dbRefInteractPath) {

    onChildAdded(ref(db, dbRefInteractPath+'/pos'), function(data) {
        const pos_info = data.val();
        onChildAddedMethod(pos_info);
    });

    onChildAdded(ref(db, dbRefInteractPath+'/resize'), function(data) {
        const resize_info = data.val();
        onChildAddedMethod(resize_info);
    });

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

    onChildAdded(ref(db, dbRefInteractPath+'/eval'), function(data) {
        const eval_info = data.val();
        onChildAddedMethod(eval_info);
    });
}




// RealTimeDatabase "interact" に要素が追加されたときに実行

onChildAdded(dbRefInteract,function() {
    const dbRefInteractPath = 'undefined/self-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract1,function() {
    const dbRefInteractPath = member[0]+'/self-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract2,function() {
    const dbRefInteractPath = member[1]+'/self-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract3,function() {
    const dbRefInteractPath = member[2]+'/self-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract4,function() {
    const dbRefInteractPath = member[3]+'/self-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract5,function() {
    const dbRefInteractPath = member[4]+'/self-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract6,function() {
    const dbRefInteractPath = member[5]+'/self-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract7,function() {
    const dbRefInteractPath = member[6]+'/self-order/interact';
    onChildChildAdded(dbRefInteractPath);
});


onChildAdded(dbRefInteract8,function() {
    const dbRefInteractPath = member[7]+'/self-order/interact';
    onChildChildAdded(dbRefInteractPath);
});

// ----------------------------------------------------------------------------------------------------> Firebase