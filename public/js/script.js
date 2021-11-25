// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog} from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Btn <----------------------------------------------------------------------------------------------------

// Auto Scroll
$("#scroll-btn").on("click", function() {
    const op = $("#output-form");

    const scrollHeight = op.get(0).scrollHeight;
    let scrollTop = op.scrollTop();

    let scrollToBottom = () => {
        op.animate(
            { scrollTop: scrollHeight },
        );
    };
    scrollToBottom();
    $(this).toggleClass("Unread");
    $(this).val('Scroll');
});


// When Posted
$("#input-form").on("submit", function() {
    const op = $("#output-form");

    const scrollHeight = op.get(0).scrollHeight;
    const scrollTop = op.scrollTop();
    const offsetHeight = op.height();

    // console.log(scrollHeight);
    // console.log(scrollTop);
    // console.log(offsetHeight);

    // Output欄の一番下までスクロール
    let scrollToBottom = () => {
        op.animate(
            { scrollTop: scrollHeight },
        );
    };

    // 一番下付近までスクロールしているかどうか
    let isScrollBottom = () => {
        // スクロールの可動域 === 現在のスクロール値 + 現在の見えているOutput欄の高さ
        let boo =  scrollHeight <= scrollTop + offsetHeight + 98;
        return boo;
    };

    // 一番下までスクロールされていれば追加後も一番下までスクロールする
    if (isScrollBottom()) {
        scrollToBottom();
    }
    // 一番下までスクロールされていなければスクロールしない
    else {
        // 新規のチャットが投稿されたら未読ボタン表示
        $("#scroll-btn").toggleClass("Unread");
        $("#scroll-btn").val('Unread');
    }
    // console.log(isScrollBottom());

});


// ----------------------------------------------------------------------------------------------------> Btn




// Menu <----------------------------------------------------------------------------------------------------

// Header Menu

$(".pdfMenuBtn").on("click", function() {
    $(".pdfWrapper").toggleClass("Inactive");
    $("#pdf-switch-btn").toggleClass("Inactive");
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
});


// When Double Click, Close Menu

$(".InputWrapper").on("dblclick", function() {
    $(this).toggleClass("Inactive");
});

$(".DrawWrapper").on("dblclick", function() {
    $(this).toggleClass("Inactive");
    $("#canvas").toggleClass("Inactive");
});

// ----------------------------------------------------------------------------------------------------> Menu




// Switch <----------------------------------------------------------------------------------------------------

// pdf切り替え
$("#pdf-switch-btn").on("click", function(e) {

    e.preventDefault();

    if ($("#doc").hasClass("Active")) {
        $("#doc").toggleClass("Active Inactive");
        $("#doc2").toggleClass("Active Inactive");
    } else if ($("#doc2").hasClass("Active")) {
        $("#doc2").toggleClass("Active Inactive");
        $("#doc3").toggleClass("Active Inactive");
    } else {
        $("#doc3").toggleClass("Active Inactive");
        $("#doc").toggleClass("Active Inactive");
    }

})

// ----------------------------------------------------------------------------------------------------> Switch
