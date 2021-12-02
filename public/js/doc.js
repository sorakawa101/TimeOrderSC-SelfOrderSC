// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive, dbRefDoc } from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------> Method




// Firebase <----------------------------------------------------------------------------------------------------

// RealtimeDatabase "doc" にドキュメントデータをセット
export function setDocData() {

    let doc_name = "";
    if ($("#set-doc-name").val()) { doc_name = $("#set-doc-name").val() } else { doc_name = $("#set-doc-num").val();} // ユーザーネームが空欄の時は"匿名"とする

    const doc = {
        tag : "doc",
        num : $("#set-doc-num").val(),
        name : doc_name,
        url: $("#set-doc-url").val(),
    }

    const newPostRef = push(dbRefDoc); // ユニークキーを生成
    // const newPostKey = newPostRef.key; // ユニークキーを取得

    set(newPostRef, doc); // ユニークキーを使ってデータをセット
}


// RealTimeDatabase "doc" に要素が追加されたときに実行
onChildAdded(dbRefDoc,function(data) {
    const doc = data.val();
    const key = data.key;

    // Docの名前とURLを変更
    $("#"+doc.num+"-open").text(doc.name)
    $("#"+doc.num).attr('src', doc.url)

    // 送信したら入力されたテキストを削除
    $("#set-doc-name").val("")
    $("#set-doc-url").val("")

});

// ----------------------------------------------------------------------------------------------------> FIrebase