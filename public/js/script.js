// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {setChatData} from "./chat.js"
import {setDocData} from "./doc.js"
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive, dbRefDoc} from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Btn <----------------------------------------------------------------------------------------------------

// Inputの送信ボタンが押された時に実行
$("#send-btn").on("click", function() {
    if (tinyMCE.get("text").getContent() === "") { return 0; } // テキストが何も書かれていなければ送信しない
    setChatData();
});


// Setの送信ボタンが押された時に実行
$("#set-btn").on("click", function() {
    if ($("#set-doc-url").val() === "") { return 0; } // URLが何も書かれていなければ送信しない
    setDocData();
})

// ----------------------------------------------------------------------------------------------------> Btn




// Menu <----------------------------------------------------------------------------------------------------

// Header Menu

$(".SetMenuBtn").on("click", function() {
    $(".SetWrapper").toggleClass("Inactive");
});

$(".InputMenuBtn").on("click", function() {
    $(".InputWrapper").toggleClass("Inactive");
});

$(".FacilitateMenuBtn").on("click", function() {
    $(".FacilitateWrapper").toggleClass("Inactive");
});

$(".LogMenuBtn").on("click", function() {
    $(".LogWrapper").toggleClass("Inactive");
});

$(".ResetMenuBtn").on("click", function() {
    remove(dbRefChat);
    remove(dbRefInteract);
    remove(dbRefLog);
    remove(dbRefArchive);
    remove(dbRefDoc);
});


// When Double Click, Close Menu

$(".SetWrapper").on("dblclick", function() {
    $(this).toggleClass("Inactive");
});

$(".InputWrapper").on("dblclick", function() {
    $(this).toggleClass("Inactive");
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

    if (active_doc_num === "6") {
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
    let board_num = board_id.split("board")[1]

    $("#board-switch-btn").removeClass("Inactive");

    if ($("#"+board_id).hasClass("Active")) {
        e.preventDefault();
    } else {
        $(".MsgWrapper > .Active").toggleClass("Active Inactive")
        $("#"+board_id).toggleClass("Active Inactive");
    }

    $(".now-board").text('"BOARD'+board_num+'"') // 現在開いているボードを表示

    // console.log(doc_id);
})

// ----------------------------------------------------------------------------------------------------> board
