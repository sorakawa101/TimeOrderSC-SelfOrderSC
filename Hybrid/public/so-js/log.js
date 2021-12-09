// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive, dbRefSetting, dbRefUser } from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------

// ChatLogを追加
function genChatLog(uname, time, board, id) {
    let chatLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: board+"で"+uname+"がChatを送信しました"}).appendTo(chatLogContent)
    $("<span>", {text: "●  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time.slice(0,5)}).appendTo(chatLogContent)
    $(".Log").append(chatLogContent)
}


// RewriteLogを追加
function genRewriteLog(uname, time, board, id) {
    let rewriteLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: board+"で"+uname+"がChatを編集しました"}).appendTo(rewriteLogContent)
    $("<span>", {text: "○  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time.slice(0,5)}).appendTo(rewriteLogContent)
    $(".Log").append(rewriteLogContent)
}


// SemanticLogを追加
function genSemanticLog(uname, time, board, semantic, rgba, id) {
    let semanticLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: board+"で"+uname+"から"+semantic+"があります"}).appendTo(semanticLogContent)
    $("<span>", {text: "●  "}).css({'color':rgba, 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time.slice(0,5)}).appendTo(semanticLogContent)
    $(".Log").append(semanticLogContent)
}


// RemovedLogを追加
function genRemovedLog(uname, time, board, id) {
    let removedLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: board+"で"+uname+"がChatを削除しました"}).appendTo(removedLogContent)
    $("<span>", {text: "▲  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time.slice(0,5)}).appendTo(removedLogContent)
    $(".Log").append(removedLogContent)
}

// ----------------------------------------------------------------------------------------------------> Method








// Firebase <----------------------------------------------------------------------------------------------------

// RealtimeDatabase "log" にデータをセット
export function setLogData(tag, uname, time, text, board, semantic, id) {

    if (tag === "post") {

        const post_log = {
            tag     : "post_log",
            uname   : uname,
            time    : time,
            text    : text,
            board   : board,
            id      : id
        }

        const newPostRef = push(dbRefLog);
        set(newPostRef, post_log);

    } else if (tag === "rewrite") {

        const rewrite_log = {
            tag     : "rewrite_log",
            uname   : uname,
            time    : time,
            text    : text,
            board   : board,
            id      : id
        }

        const newPostRef = push(dbRefLog);
        set(newPostRef, rewrite_log);

    } else if (tag === "semantic") {

        const semantic_log = {
            tag         : "semantic_log",
            uname       : uname,
            time        : time,
            semantic    : semantic,
            board       : board,
            id          : id
        }

        let newPostRef = push(dbRefLog);
        set(newPostRef, semantic_log);

    } else if (tag === "removed") {
        const removed_log = {
            tag     : "removed_log",
            uname   : uname,
            time    : time,
            text    : text,
            board   : board,
            id      : id
        }

        let newPostRef = push(dbRefLog);
        set(newPostRef, removed_log);

    } else {;}
}


// RealTimeDatabase "log" に要素が追加されたときに実行
onChildAdded(dbRefLog,function(data) {
    const log = data.val();
    const key = data.key; // ユニークキーを取得

    if (log.tag === "post_log") { genChatLog(log.uname, log.time, log.board, log.id); }

    else if (log.tag === "rewrite_log") { genRewriteLog(log.uname, log.time, log.board, log.id); }

    else if (log.tag === "semantic_log") {

        switch (log.semantic) {
            case "none":
                break;
            case "idea":
                genSemanticLog(log.uname, log.time, log.board, "提案", 'rgba(255,105,98,.8)', log.id);
                break;
            case "facilitation":
                genSemanticLog(log.uname, log.time, log.board, "進行", 'rgba(136,196,228,.8)', log.id);
                break;
            case "question":
                genSemanticLog(log.uname, log.time, log.board, "質疑", 'rgba(255,175,104,.8)', log.id);
                break;
            case "answer":
                genSemanticLog(log.uname, log.time, log.board, "応答", 'rgba(192,231,197,.8)', log.id);
                break;
            case "comment":
                genSemanticLog(log.uname, log.time, log.board, "感想", 'rgba(246,230,131,.8)', log.id);
                break;
            case "information":
                genSemanticLog(log.uname, log.time, log.board, "連絡", 'rgba(151,150,188,.8)', log.id);
                break;
            default:
                ;
        }
    }

    else if (log.tag === "removed_log") { genRemovedLog(log.uname, log.time, log.board, log.id); }

    else {;}
});

// ----------------------------------------------------------------------------------------------------> FIrebase