// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
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
    remove(dbRefChat);
    remove(dbRefInteract);
    remove(dbRefLog);
    remove(dbRefArchive);
    remove(dbRefSetting);
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
    $(".now-board").text('現在のボード："'+$("#"+board_open_id).text()+'"') // 現在開いているボードを表示

    // console.log(doc_id);
})


// ユーザーネームが設定されていない時アラートを表示
$(".MainWrapper").on("click", function(e) {
    if ($("#set-username").val() === "undefined" || $("#input-username").val() === "undefined") { alert('"右上のプルダウンメニューから自分の名前を選択して右隣のSETボタンを押して下さい"'); return 0; }
    e.preventDefault();
})

// ----------------------------------------------------------------------------------------------------> board