// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, get, set, child, onChildAdded, onChildChanged, remove, onChildRemoved, update }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { setChatData } from "./chat.js"
import { setUsernameData, setBoardData, setDocData } from "./setting.js"
import { db, dbRefResultSum } from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import



// Method <----------------------------------------------------------------------------------------------------

// 現在時刻を取得する
export function getNow() {
    const date = new Date();
    const now = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2) + ":" + ("0"+date.getSeconds()).slice(-2);

    return now;
}

 // ユーザーネームをSETから取得する
export function getUsernameFromSet() {
    let username = $("#set-username").val()
    return username;
}


// ユーザーネームをInputから取得する
export function getUsernameFromInput() {
    let username = $("#input-username").val()
    return username;
}


export function getUsernameFromSpeechBalloon(id) {
    let username = $("#"+id+" .ChatInfo > .Name").text()
    console.log(username);
    return username;
}

// ----------------------------------------------------------------------------------------------------> Method




// Firebase <----------------------------------------------------------------------------------------------------

// RealtimeDatabase "result"のデータが空の時に初期設定を行う
export function initResultData() {

    const dbRef = ref(db, getUsernameFromSet()+'/time-order/result');

    const init_result = {
        chat                        : 0,

        interact                    : 0,
        interact_check              : 0,
        interact_delete             : 0,
        interact_edit               : 0,

        mouse                       : 0,
        mouse_focusin               : 0,
        mouse_focusout              : 0,
        mouse_mousedown             : 0,
        mouse_mouseup               : 0,

        semantic                    : 0,
        semantic1_none              : 0,
        semantic2_important         : 0,
        semantic3_facilitation      : 0,
        semantic4_question          : 0,
        semantic5_response          : 0,
        semantic6_note              : 0,
        semantic7_answer            : 0,

        // variation                   : 0,
        // variation_pos               : 0,
        // variation_resize            : 0
    }

    get(dbRef).then((snapshot) => { if (snapshot.exists() === false) { set(dbRef, init_result); } });

    get(dbRefResultSum).then((snapshot) => { if (snapshot.exists() === false) { set(dbRefResultSum, init_result); } });

}


// RealtimeDatabase "result"のデータを更新
export function updateResultData(dbRef, tag) {

    get(dbRef).then((snapshot) => {

        switch (tag) {

            case "chat":
                const chat_result = { chat : snapshot.val().chat+1 }
                update(dbRef, chat_result);
                break;


            case "interact":
                const interact_result = { interact : snapshot.val().interact+1 }
                update(dbRef, interact_result);
                break;
            case "check":
                const check_result = { interact_check : snapshot.val().interact_check+1 }
                update(dbRef, check_result);
                break;
            case "delete":
                const delete_result = { interact_delete : snapshot.val().interact_delete+1 }
                update(dbRef, delete_result);
                break;
            case "edit":
                const edit_result = { interact_edit : snapshot.val().interact_edit+1 }
                update(dbRef, edit_result);
                break;


            case "mouse":
                const mouse_result = { mouse : snapshot.val().mouse+1 }
                update(dbRef, mouse_result);
                break;
            case "focusin":
                const focusin_result = { mouse_focusin : snapshot.val().mouse_focusin+1 }
                update(dbRef, focusin_result);
                break;
            case "focusout":
                const focusout_result = { mouse_focusout : snapshot.val().mouse_focusout+1 }
                update(dbRef, focusout_result);
                break;
            case "mousedown":
                const mousedown_result = { mouse_mousedown : snapshot.val().mouse_mousedown+1 }
                update(dbRef, mousedown_result);
                break;
            case "mouseup":
                const mouseup_result = { mouse_mouseup : snapshot.val().mouse_mouseup+1 }
                update(dbRef, mouseup_result);
                break;


            case "semantic":
                const semantic_result = { semantic : snapshot.val().semantic+1 }
                update(dbRef, semantic_result);
                break;
            case "none":
                const semantic_none_result = { semantic1_none : snapshot.val().semantic1_none+1 }
                update(dbRef, semantic_none_result);
                break;
            case "important":
                const semantic_important_result = { semantic2_important : snapshot.val().semantic2_important+1 }
                update(dbRef, semantic_important_result);
                break;
            case "facilitation":
                const semantic_facilitation_result = { semantic3_facilitation : snapshot.val().semantic3_facilitation+1 }
                update(dbRef, semantic_facilitation_result);
                break;
            case "question":
                const semantic_question_result = { semantic4_question : snapshot.val().semantic4_question+1 }
                update(dbRef, semantic_question_result);
                break;
            case "response":
                const semantic_response_result = { semantic5_response : snapshot.val().semantic5_response+1 }
                update(dbRef, semantic_response_result);
                break;
            case "note":
                const semantic_note_result = { semantic6_note : snapshot.val().semantic6_note+1 }
                update(dbRef, semantic_note_result);
                break;
            case "answer":
                const semantic_answer_result = { semantic7_answer : snapshot.val().semantic7_answer+1 }
                update(dbRef, semantic_answer_result);
                break;


            // case "variation":
            //     const variation_result = { variation : snapshot.val().variation+v }
            //     update(dbRef, variation_result);
            //     break;
            // case "pos":
            //     const pos_result = { variation_pos : snapshot.val().variation_pos+v }
            //     update(dbRef, pos_result);
            //     break;
            // case "resize":
            //     const resize_result = { variation_resize : snapshot.val().variation_resize+v }
            //     update(dbRef, resize_result);
            //     break;

            // default:
            //     ;
        }
        // console.log('update');
    });
}


// RealtimeDatabase "result"にデータをセット（各操作でこの関数を呼び出す）
export function setResultData(user, tag) {

    const dbRef = ref(db, user+'/time-order/result');
    updateResultData(dbRef,tag);
    updateResultData(dbRefResultSum, tag);

}

// ----------------------------------------------------------------------------------------------------> Firebase



// Btn <----------------------------------------------------------------------------------------------------

// Inputの送信ボタンが押された時に実行
$("#send-btn").on("click", function() {

    // テキストが何も書かれていなければ送信しない
    if (tinyMCE.get("text").getContent() === "") { return 0; }

    // ユーザーネームが設定されていない時アラートを表示
    if ($("#set-username").val() === "undefined" || $("#input-username").val() === "undefined") { alert('"右上のプルダウンメニューから自分の名前を選択して右隣のSETボタンを押して下さい"'); return 0; }

    setChatData();
});


// Setの送信ボタンが押された時に実行
$("#set-btn").on("click", function(e) {

    if ($("#set-username").val() === "undefined") {;}
    else if ($("#set-username").val()) {
        setUsernameData();
        $("#set-username").toggleClass('Inactive')
        $(this).css('pointer-events','none')
        $(".MsgWrapper").css('pointer-events','all')
        $(".SideWrapper").css('pointer-events','all')

        initResultData(); // "result"の初期設定
    }

    e.preventDefault();

})

// ----------------------------------------------------------------------------------------------------> Btn




// Menu <----------------------------------------------------------------------------------------------------

// Header Menu

$(".SetMenuBtn").on("click", function() {
    $(".SetWrapper").toggleClass("Inactive");

    // ユーザー名が設定されていない時ヒントを表示
    if ($("#set-username").val() === "undefined" || $("#input-username").val() === "undefined") {
        $(".HintUname").css('display', 'inline');
        return 0;
    }

});


$(".InputMenuBtn").on("click", function() {
    $(".InputWrapper").toggleClass("Inactive");
});


$(".LogMenuBtn").on("click", function() {
    $(".LogWrapper").toggleClass("Inactive");
});


$(".ResetMenuBtn").on("click", function() {
    remove(ref(db));
});


// When Double Click, Close Menu

$(".MsgWrapper").on("click", function() {
    $(".SetWrapper").addClass('Inactive')
});

// ----------------------------------------------------------------------------------------------------> Menu




// pdf <----------------------------------------------------------------------------------------------------

// pdfを閉じる
$("#pdf-close-btn").on("click", function(e) {
    $(".pdfWrapper").toggleClass("Inactive");
    $("#pdf-close-btn").toggleClass("Inactive");
    $("#pdf-switch-btn").toggleClass("Inactive");
})


// 順番にpdf切り替え
$("#pdf-switch-btn").on("click", function(e) {

    let active_doc_id = $(".Doc.Active").attr('id')
    let active_doc_num = active_doc_id.split("doc")[1]
    let next_doc_num = Number(active_doc_num)+1

    if (active_doc_num === "4") {
        $("#doc"+active_doc_num).toggleClass("Active Inactive");
        $("#doc1").toggleClass("Active Inactive");
    } else {
        $("#doc"+active_doc_num).toggleClass("Active Inactive");
        $("#doc"+next_doc_num).toggleClass("Active Inactive");
    }

    // console.log(active_doc_num);
    // console.log(next_doc_num);
})


// 指定してpdfを開く
$(".DocOpen").on("click", function(e) {
    let doc_open_id = $(this).attr('id')
    let doc_id = doc_open_id.split('-')[0]

    $(".pdfWrapper").removeClass("Inactive");
    $("#pdf-close-btn").removeClass("Inactive");
    $("#pdf-switch-btn").removeClass("Inactive");

    if ($("#"+doc_id).hasClass("Active")) {
        e.preventDefault();
    } else {
        $(".pdfWrapper > .Active").toggleClass("Active Inactive")
        $("#"+doc_id).toggleClass("Active Inactive");
    }

    // console.log(doc_id);
})

// ----------------------------------------------------------------------------------------------------> pdf




// board <----------------------------------------------------------------------------------------------------

// 指定してボードを切り替える
$(".BoardOpen").on("click", function(e) {
    let board_open_id = $(this).attr('id')
    let board_id = board_open_id.split('-')[0]
    // let board_num = board_id.split("board")[1]

    $("#board-switch-btn").removeClass("Inactive");

    if ($("#"+board_id).hasClass("Active")) {
        e.preventDefault();
    } else {
        $(".MsgWrapper > .Active").toggleClass("Active Inactive")
        $("#"+board_id).toggleClass("Active Inactive");
    }

    // $(".now-board").text('"BOARD'+board_num+'"') // 現在開いているボードを表示
    $(".now-board").text('ボード："'+$("#"+board_open_id).text()+'"') // 現在開いているボードを表示

    // console.log(doc_id);
})


// ユーザーネームが設定されていない時アラートを表示
$(".MainWrapper").on("click", function(e) {
    if ($("#set-username").val() === "undefined" || $("#input-username").val() === "undefined") { alert('右上のプルダウンメニューから自分の名前を選択して右隣のSETボタンを押して下さい'); return 0; }
    e.preventDefault();
})

// ----------------------------------------------------------------------------------------------------> board