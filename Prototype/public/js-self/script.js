// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, get, set, child, onChildAdded, onChildChanged, remove, onChildRemoved, update }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { setChatData } from "./chat.js"
import { setUsernameData, setBoardData, setDocData } from "./setting.js"
import { firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive, dbRefSetting, dbRefUser } from "./config.js";

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

// ----------------------------------------------------------------------------------------------------> Method




// Firebase <----------------------------------------------------------------------------------------------------


// RealtimeDatabase "result"のデータが空の時に初期設定を行う
export function initResultData() {

    const dbRef = ref(db, getUsernameFromSet()+'/self-order/result');

    get(dbRef).then((snapshot) => {

        if (snapshot.exists() === false) {

            const init_result = {
                chat        : 0,
                pos         : 0,
                resize      : 0,
                check       : 0,
                delete      : 0,
                edit        : 0,
                semantic    : 0,
                focusin     : 0,
                focusout    : 0,
                mousedown   : 0,
                mouseup     : 0
            }

            set(dbRef, init_result);
            console.log('init');

        }
    });
}


// RealtimeDatabase "result"のデータを更新
export function updateResultData(dbRef, tag) {

    get(dbRef).then((snapshot) => {

        switch (tag) {

            case "chat":
                const chat_result = { chat : snapshot.val().chat+1 }
                update(dbRef, chat_result);
                break;
            case "pos":
                const pos_result = { pos : snapshot.val().pos+1 }
                update(dbRef, pos_result);
                break;
            case "resize":
                const resize_result = { resize : snapshot.val().resize+1 }
                update(dbRef, resize_result);
                break;
            case "check":
                const check_result = { check : snapshot.val().check+1 }
                update(dbRef, check_result);
                break;
            case "delete":
                const delete_result = { delete : snapshot.val().delete+1 }
                update(dbRef, delete_result);
                break;
            case "edit":
                const edit_result = { edit : snapshot.val().edit+1 }
                update(dbRef, edit_result);
                break;
            case "semantic":
                const semantic_result = { semantic : snapshot.val().semantic+1 }
                update(dbRef, semantic_result);
                break;
            case "focusin":
                const focusin_result = { focusin : snapshot.val().focusin+1 }
                update(dbRef, focusin_result);
                break;
            case "focusout":
                const focusout_result = { focusout : snapshot.val().focusout+1 }
                update(dbRef, focusout_result);
                break;
            case "mousedown":
                const mousedown_result = { mousedown : snapshot.val().mousedown+1 }
                update(dbRef, mousedown_result);
                break;
            case "mouseup":
                const mouseup_result = { mouseup : snapshot.val().mouseup+1 }
                update(dbRef, mouseup_result);
                break;
            default:
                ;
        }
        console.log('update');
    });
}


// RealtimeDatabase "result"にデータをセット（各操作でこの関数を呼び出す）
export function setResultData(user, tag) {

    const dbRef = ref(db, user+'/self-order/result');
    updateResultData(dbRef,tag);

}

// ----------------------------------------------------------------------------------------------------> Firebase




// Btn <----------------------------------------------------------------------------------------------------

// Inputの送信ボタンが押された時に実行
$("#send-btn").on("click", function() {

    // テキストが何も書かれていなければ送信しない
    if (tinyMCE.get("text").getContent() === "") { return 0; }

    // ユーザーネームが設定されていない時アラートを表示
    // if ($("#set-username").val() === "undefined" || $("#input-username").val() === "undefined") { alert('"右上のプルダウンメニューから自分の名前を選択して右隣のSETボタンを押して下さい"'); return 0; }

    setChatData();

});


// Setの送信ボタンが押された時に実行
$("#set-btn").on("click", function(e) {

    if ($("#set-username").val() === "undefined") {;}
    else if ($("#set-username").val()) {
        setUsernameData();
        $("#set-username").toggleClass('Inactive')
        $(this).css('pointer-events','none')

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

$(".SideMenuBtn").on("click", function() {
    $(".Side").toggleClass("Inactive");
});

$(".ResetMenuBtn").on("click", function() {
    remove(ref(db));
});


// When Double Click, Close Menu

$(".MsgWrapper").on("click", function() {
    $(".SetWrapper").addClass('Inactive')
});


$(".SideWrapper").on("dblclick", function() {
    $(".Side").addClass('Inactive')
});


// ----------------------------------------------------------------------------------------------------> Menu




// pdf <----------------------------------------------------------------------------------------------------

// pdfを閉じる
$("#pdf-close-btn").on("click", function(e) {
    $(".pdfWrapper").toggleClass("Inactive");
    $("#pdf-close-btn").toggleClass("Inactive");
    $("#pdf-switch-btn").toggleClass("Inactive");
    $(".MsgWrapper").css('width', '100%')
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
        $(".MsgWrapper").css('width', '70%')
    }

    // console.log(doc_id);
})

// URL指定欄はダブルクリックで編集可能
$(".SetURL").on("dblclick", function(e) {
    if($(this).attr('readonly', true)) { $(this).attr('readonly', false) }
    e.preventDefault();
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
// $(".MainWrapper").on("click", function(e) {
//     if ($("#set-username").val() === "undefined" || $("#input-username").val() === "undefined") { alert('"右上のプルダウンメニューから自分の名前を選択して右隣のSETボタンを押して下さい"'); return 0; }
//     e.preventDefault();
// })

// ----------------------------------------------------------------------------------------------------> board