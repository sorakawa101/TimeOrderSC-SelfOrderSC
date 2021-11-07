// <!--** 以下Firebase **-->
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCY7Ev62Efss5mYEtX4QZegSqlSg84gns8",
    authDomain: "sample-517b0.firebaseapp.com",
    projectId: "sample-517b0",
    storageBucket: "sample-517b0.appspot.com",
    messagingSenderId: "464670111932",
    appId: "1:464670111932:web:fc91c33be8ef8a5da0f8b9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
const db = getDatabase(app); // RealTimeDatabaseに接続
const dbRef = ref(db, "chat");

// 送信ボタンが押された時
$("#send-btn").on("click", function() {
    const date = new Date();
    // const now = date.getMonth()+1 + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    const now = ("0"+(date.getMonth()+1)).slice(-2) + "/" + ("0"+date.getDate()).slice(-2) + " " + ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);
    const msg = {
        uname : $("#uname").val(),
        time: now,
        // text : $("#text").val()
        // text : tinyMCE.get("text").getContent({format: "text"})
        text: tinyMCE.get("text").getContent()
    }
    const newPostRef = push(dbRef); // ユニークキーを生成
    set(newPostRef, msg);
});

// // ドロップダウンメニュー
// $(".menu-icon").on("click",
//     function() {
//         document.getElementById("dropdown-menu").style.display = "block";
//     }, function() {
//         document.getElementById("dropdown-menu").style.display = "none";
//     }
// );

// $("#dropdown-menu").hover(
//     function() {
//             document.getElementById("dropdown-menu").style.display = "block";
//         }, function() {
//             document.getElementById("dropdown-menu").style.display = "none";
//         }
// );

// RealTimeDatabaseに新しい要素が追加された時に実行
onChildAdded(dbRef,function(data) {
    const msg = data.val();
    const key = data.key; // ユニークキーを取得

    // チャット全体のBlock要素
    let chatBox = document.createElement("div");
        chatBox.classList.add("chat-box");

    let timeText = document.createElement("span");
        timeText.classList.add("time-box");
        timeText.textContent = msg.time;

    // // 名前のBlock要素
    // let unameBox = document.createElement("div");
    //     unameBox.classList.add("uname-box");
    // // チャット内容のBlock要素
    // let textBox = document.createElement("div");
    //     textBox.classList.add("text-box");

    // 名前とチャット内容を書き込むpタグを生成して、それぞれデータベースからテキストとして挿入
    let unameText = document.createElement("p");
        unameText.classList.add("uname-box");
        if (msg.uname) {
            unameText.textContent = msg.uname;
            unameText.append(timeText);
        } else {
            unameText.textContent = "匿名";
            unameText.append(timeText);
        }

    let textText = document.createElement("div");
        textText.innerHTML = msg.text; // テキスト内のhtmlタグを取得
        textText = textText.firstElementChild; // 最初のこ要素を取得（divタグを除去）
        // textText.classList.add("text-box");

    // // 名前のBlock要素に名前のテキストが入ったpタグを挟む
    // unameBox.append(unameText);
    // // チャット内容のBlock要素に〜
    // textBox.append(textText);

    // チャット全体のBlock要素に名前とチャット内容のBlock要素を入れる
        chatBox.append(unameText);
        chatBox.append(textText);

    // チャットのOutput欄にチャット全体のBlock要素を挟む
    // チャット内容が空の時は何も投稿しない
    if (msg.text) {
        $("#output-form").append(chatBox);
    } else {
        ;
    }

    // 送信したら入力されたテキストを削除
    let textForm = document.getElementById("uname");
        textForm.value = '';
        tinyMCE.get("text").setContent('');
});

$("#scroll-btn").on("click", function() {
    const op = $("#output-form");

    const scrollHeight = op.get(0).scrollHeight;
    const scrollTop = op.scrollTop();

    let scrollToBottom = () => {
        op.animate(
            { scrollTop: scrollHeight },
        );
    };
    scrollToBottom();
});

// 未読ボタンが押された時
$("#unread-btn").on("click", function() {
    const op = $("#output-form");

    const scrollHeight = op.get(0).scrollHeight;
    const scrollTop = op.scrollTop();

    let scrollToBottom = () => {
        op.animate(
            { scrollTop: scrollHeight },
        );
    };
    scrollToBottom();
    document.getElementById("scroll-btn").style.display = "block";
    document.getElementById("unread-btn").style.display = "none";
});

// フォームが送信された時
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
        document.getElementById("scroll-btn").style.display = "none";
        document.getElementById("unread-btn").style.display = "block";
    }
    // console.log(isScrollBottom());
});

// Shift+Enterで送信
$("#text").keydown(function(e) {
    if( e.keyCode === 16 ) {  // When "Shift + Enter"
        $("#send-btn").trigger("submit");
    } else {
        e.preventDefault(); // イベントキャンセル
    }
});