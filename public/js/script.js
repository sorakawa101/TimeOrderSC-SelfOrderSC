// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { setChatData } from "./chat.js"
import { setUsernameData, setBoardData, setDocData } from "./setting.js"
import { firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive, dbRefSetting } from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import



// Method <----------------------------------------------------------------------------------------------------

// 現在時刻を取得する
export function getNow() {
    const date = new Date();
    const now = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);

    return now;
}

 // ユーザーネームをSETから取得する
export function getUsernameFromSet() {
    let username = "";

    if ($("#set-username").val()) {
        username = $("#set-username").val()
    } else {
        username = "匿名";
    }

    return username;
}


// ユーザーネームをInputから取得する
export function getUsernameFromInput() {
    let username = "";

    if ($("#uname").val()) {
        username = $("#uname").val()
    } else { username = "匿名";
    }

    return username;
}

// ----------------------------------------------------------------------------------------------------> Method




// Btn <----------------------------------------------------------------------------------------------------

// Inputの送信ボタンが押された時に実行
$("#send-btn").on("click", function() {
    if (tinyMCE.get("text").getContent() === "") { return 0; } // テキストが何も書かれていなければ送信しない
    setChatData();
});


// Setの送信ボタンが押された時に実行
$("#set-btn").on("click", function(e) {

    if ($("#set-username").val() && !$("#set-username").attr('readonly')) {
        setUsernameData();
        $(".now-user").text('現在のユーザー："'+$("#set-username").val()+'"') // ユーザーの名前をheaderに表示

        // Inputのユーザーネームにも同じ名前をセット
        $("#uname").val($("#set-username").val())
    }
    if ($("#set-board-name").val()) { setBoardData(); }
    if ($("#set-doc-name").val() || $("#set-doc-url").val()) { setDocData(); }

    e.preventDefault();

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
    remove(dbRefSetting);
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

// ----------------------------------------------------------------------------------------------------> board




// Username <----------------------------------------------------------------------------------------------------

// ユーザー名を修正したい時はダブルクリック（SET）
$("#set-username").on("dblclick", function(e) {

    $(this).attr('readonly', false);
    $(this).css('background-color', 'white')

    e.preventDefault();
})

// ユーザー名を修正したい時はダブルクリック（INPUT）
$("#uname").on("dblclick", function(e) {

    $(this).attr('readonly', false);
    $(this).css('background-color', 'white')

    e.preventDefault();
})


// ユーザー名を修正したい時はダブルクリック（SET）のヒントを表示
$("#set-username").hover(function() {
        if ($(this).attr('readonly', true)) { $(".SetWrapper .HintUname").css('display', 'inline') }
    }, function() {
        $(".HintUname").css('display', 'none')
    }
)

// ユーザー名を修正したい時はダブルクリック（INPUT）のヒントを表示
$("#uname").hover(function() {
        if ($(this).attr('readonly', true)) { $(".InputWrapper .HintUname").css('display', 'inline') }
    }, function() {
        $(".HintUname").css('display', 'none')
    }
)

// ----------------------------------------------------------------------------------------------------> Username