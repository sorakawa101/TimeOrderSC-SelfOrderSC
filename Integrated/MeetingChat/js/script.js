// Firebase Config <----------------------------------------------------------------------------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1e7dTQDCTEKfrNTSyWb63V-s408nqN_o",
    authDomain: "research-project-dad15.firebaseapp.com",
    projectId: "research-project-dad15",
    storageBucket: "research-project-dad15.appspot.com",
    messagingSenderId: "760369282337",
    appId: "1:760369282337:web:47ab3f3ebf3ca4a43b1260"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
const db = getDatabase(app); // RealTimeDatabaseに接続
const dbRefChat = ref(db, "chat");
const dbRefInteract = ref(db, "interact");

// ----------------------------------------------------------------------------------------------------> Firebase Config





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


// // Unread Case
// $("#unread-btn").on("click", function() {
//     const op = $("#output-form");

//     const scrollHeight = op.get(0).scrollHeight;
//     const scrollTop = op.scrollTop();

//     let scrollToBottom = () => {
//         op.animate(
//             { scrollTop: scrollHeight },
//         );
//     };
//     scrollToBottom();
//     document.getElementById("scroll-btn").style.display = "block";
//     document.getElementById("unread-btn").style.display = "none";
// });


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

// Shift+Enterで送信
$(".mce-content-body").keydown(function(e) {
    if( e.keyCode === 13 ) {  // When "Shift + Enter"
        console.log("Enter");
    } else {
        e.preventDefault(); // イベントキャンセル
    }
    $("#send-btn").trigger("submit");
});

// ----------------------------------------------------------------------------------------------------> Btn




// Menu <----------------------------------------------------------------------------------------------------

// Header Menu

$(".pdfMenuBtn").on("click", function() {
    $(".pdfWrapper").toggleClass("Inactive");
});

$(".InputMenuBtn").on("click", function() {
    $(".InputWrapper").toggleClass("Inactive");
});

$(".FacilitateMenuBtn").on("click", function() {
    $(".FacilitateWrapper").toggleClass("Inactive");
});

$(".DrawMenuBtn").on("click", function() {
    $(".DrawWrapper").toggleClass("Inactive");
    $("#canvas").toggleClass("Inactive");
});

$(".ResetMenuBtn").on("click", function() {
    remove(dbRefChat);
    remove(dbRefInteract);
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