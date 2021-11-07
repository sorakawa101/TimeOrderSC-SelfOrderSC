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

$("#send").on("click", function() {
    const msg = {
        uname : $("#uname").val(),
        // uname: document.getElementById("uname"),
        text : $("#text").val()
        // text: document.getElementById("text")
    }
    const newPostRef = push(dbRef); // ユニークキーを生成
    set(newPostRef, msg);
});

onChildAdded(dbRef,function(data) { // RealTimeDatabaseに新しい要素が追加された時に実行
    const msg = data.val();
    // const msg = document.getElementById(data);
    const key = data.key; // ユニークキーを取得

    // チャット全体のBlock要素
    let chatBox = document.createElement("div");
        chatBox.classList.add("chat-box");

    // 名前のBlock要素
    let unameBox = document.createElement("div");
        unameBox.classList.add("uname-box");
    // チャット内容のBlock要素
    let textBox = document.createElement("div");
        textBox.classList.add("text-box");

    // 名前とチャット内容を書き込むpタグを生成して、それぞれデータベースからテキストとして挿入
    let unameText = document.createElement("p");
        unameText.textContent = msg.uname;
    let textText = document.createElement("p");
        textText.textContent = msg.text;

    // 名前のBlock要素に名前のテキストが入ったpタグを挟む
    unameBox.append(unameText);
    // チャット内容のBlock要素に〜
    textBox.append(textText);

    // チャット全体のBlock要素に名前とチャット内容のBlock要素を入れる
    chatBox.append(unameBox);
    chatBox.append(textBox);

    // チャットのOutput欄にチャット全体のBlock要素を挟む
    $("#output-form").append(chatBox);

    // 送信したら入力されたテキストを削除
    let textForm = document.getElementById("uname");
        textForm.value = '';
    let textareaForm = document.getElementById("text");
        textareaForm.value = '';

    // 新規のチャットが投稿されたら未読ボタン表示
    let unreadBtn = () => {
        let btn = document.createElement("a");
        btn.classList.add("unread-btn");
        btn.textContent = "未読のチャットがあります";
        $("#output-form").append(btn);
    }


    // Output欄の一番下までスクロール
    let scrollToBottom = () => {
        $("#output-form").animate(
            { scrollTop: $("#output-form").get(0).scrollHeight },
        );
    };

    // 一番下までスクロールしているかどうか
    let isScrollBottom = () => {
        // スクロールの可動域 === 現在のスクロール値 + 現在の見えているOutput欄の高さ
        return $("#output-form").get(0).scrollHeight === $("#output-form").scrollTop() + $("#output-form").height();
    };

    // 一番下までスクロールされていれば追加後も一番下までスクロールする
    if (isScrollBottom()) {
    scrollToBottom();
    }
    // 一番下までスクロールされていなければスクロールしない
    else {
        unreadBtn();
    }

});

// // console.log(isScrollBottom());
// console.log($("output-form").scrollHeight);
// console.log($("output-form").scrollTop);
// console.log($("output-form").offsetHeight);


// $("#output-form").scroll(function() {
//     var scrollTop = $(this).scrollTop();
//     var scrollHeight = $(this).get(0).scrollHeight;
//     var offsetHeight = $(this).height();

//     console.log(scrollTop);
//     console.log(scrollHeight);
//     console.log(offsetHeight);
// });

