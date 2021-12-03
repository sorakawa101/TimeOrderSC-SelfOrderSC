// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive, dbRefSetting } from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------> Method




// Firebase <----------------------------------------------------------------------------------------------------

// RealtimeDatabase "doc" にユーザーデータをセット
export function setUsernameData() {

    const username = {
        tag : "username",
        name : $("#set-username").val(),
    }

    const newPostRef = push(dbRefSetting); // ユニークキーを生成
    // const newPostKey = newPostRef.key; // ユニークキーを取得

    set(newPostRef, username); // ユニークキーを使ってデータをセット
}


// RealtimeDatabase "doc" にボードデータをセット
export function setBoardData() {

    const board_num = $("#set-board-num").val();
    const board_name = $("#set-board-name").val();

    const board = {
        tag : "board",
        num : board_num,
        name : board_name,
    }

    const newPostRef = push(dbRefSetting); // ユニークキーを生成
    // const newPostKey = newPostRef.key; // ユニークキーを取得

    set(newPostRef, board); // ユニークキーを使ってデータをセット
}


// RealtimeDatabase "doc" にドキュメントデータをセット
export function setDocData() {

    let doc_num = $("#set-doc-num").val();
    let doc_name = "";
    let doc_url = "";

    if ($("#set-doc-name").val()) { doc_name = $("#set-doc-name").val() } else { doc_name = $("#"+doc_num+"-open").text();}
    if ($("#set-doc-url").val()) { doc_url = $("#set-doc-url").val() } else { doc_url = $("#"+doc_num).attr('src');}

    const doc = {
        tag : "doc",
        num : doc_num,
        name : doc_name,
        url: doc_url,
    }

    const newPostRef = push(dbRefSetting); // ユニークキーを生成
    // const newPostKey = newPostRef.key; // ユニークキーを取得

    set(newPostRef, doc); // ユニークキーを使ってデータをセット
}


// RealTimeDatabase "doc" に要素が追加されたときに実行
onChildAdded(dbRefSetting,function(data) {
    const info = data.val();
    const key = data.key;

    if (info.tag === "username") {

        // set-usernameをreadonlyにする
        $("#set-username").attr('readonly', true)
        $("#set-username").css('background-color', 'rgba(34, 49, 52, .1)')

        // unameをreadonlyにする
        $("#uname").attr('readonly', true)
        $("#uname").css('background-color', 'rgba(34, 49, 52, .1)')

    } else if (info.tag === "board") {

        // Boardの名前とURLを変更
        $("#"+info.num+"-open").text(info.name)

        // 送信したら入力されたテキストを削除
        $("#set-board-name").val("")

    } else if (info.tag === "doc") {

        // Docの名前とURLを変更
        $("#"+info.num+"-open").text(info.name)
        $("#"+info.num).attr('src', info.url)

        // 送信したら入力されたテキストを削除
        $("#set-doc-name").val("")
        $("#set-doc-url").val("")

    } else {;}

});

// ----------------------------------------------------------------------------------------------------> FIrebase