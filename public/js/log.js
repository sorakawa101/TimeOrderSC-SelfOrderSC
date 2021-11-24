// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog } from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------

// Firebaseの"chat"にデータ送信
export function setLogData(tag, uname, time, text, semantic, key) {

    if (tag === "post") {

        const post_log = {
            tag : "post_log",
            uname : uname,
            time: time,
            text: text
        }

        const newPostRef = push(dbRefLog); // ユニークキーを生成
        set(newPostRef, post_log);

    } else if (tag === "rewrite") {

        const rewrite_log = {
            tag : "rewrite_log",
            uname : uname,
            time: time,
            text: text
        }

        const newPostRef = push(dbRefLog); // ユニークキーを生成
        set(newPostRef, rewrite_log);

    } else if (tag === "semantic") {

        const semantic_log = {
            tag : "semantic_log",
            uname : uname,
            time : time,
            semantic : semantic,
        }

        let newPostRef = push(dbRefLog); // ユニークキーを生成
        set(newPostRef, semantic_log);

    } else {;}
}


// ChatLog

export function genChatLog(uname, time) {
    // SemanticLog
    let chatLogContent = $("<div>", {class: 'LogContent'})
    let txt = $("<p>", {text: uname+"がChatを送信しました"}).appendTo(chatLogContent)
    $("<span>", {text: "●  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.5rem'}).prependTo(txt)
    $("<p>", {text: time}).appendTo(chatLogContent)
    $(".Log").append(chatLogContent)
}


// RewriteLog
export function genRewriteLog(uname, time) {
    let rewriteLogContent = $("<div>", {class: 'LogContent'})
    let txt = $("<p>", {text: uname+"がChatを編集しました"}).appendTo(rewriteLogContent)
    $("<span>", {text: "○  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.5rem'}).prependTo(txt)
    $("<p>", {text: time}).appendTo(rewriteLogContent)
    $(".Log").append(rewriteLogContent)
}


// SemanticLog

export function genSemanticLog(uname, time, semantic, rgba) {
    // SemanticLog
    let semanticLogContent = $("<div>", {class: 'LogContent'})
    let txt = $("<p>", {text: uname+"から"+semantic+"があります"}).appendTo(semanticLogContent)
    $("<span>", {text: "●  "}).css({'color':rgba, 'font-size':'.5rem'}).prependTo(txt)
    $("<p>", {text: time}).appendTo(semanticLogContent)
    $(".Log").append(semanticLogContent)
}

// ----------------------------------------------------------------------------------------------------> Method



// RealTimeDatabase

onChildAdded(dbRefLog,function(data) {
    const log = data.val();
    const key = data.key; // ユニークキーを取得

    if (log.tag === "post_log") { genChatLog(log.uname, log.time); }

    else if (log.tag === "rewrite_log") { genRewriteLog(log.uname, log.time); }

    else if (log.tag === "semantic_log") {

        switch (log.semantic) {
            case "none":
                break;
            case "idea":
                genSemanticLog(log.uname, log.time, "提案", 'rgba(255,105,98,.8)');
                break;
            case "facilitation":
                genSemanticLog(log.uname, log.time, "進行", 'rgba(136,196,228,.8)');
                break;
            case "question":
                genSemanticLog(log.uname, log.time, "質疑", 'rgba(255,175,104,.8)');
                break;
            case "answer":
                genSemanticLog(log.uname, log.time, "応答", 'rgba(192,231,197,.8)');

                break;
            case "comment":
                genSemanticLog(log.uname, log.time, "感想", 'rgba(246,230,131,.8)');
                break;
            case "information":
                genSemanticLog(log.uname, log.time, "連絡", 'rgba(151,150,188,.8)');
                break;
            default:
                ;
        }
    }

    else {;}
});
