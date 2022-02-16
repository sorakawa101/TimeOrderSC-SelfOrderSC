// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive, dbRefSetting, dbRefUser } from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------

// ChatLogを追加
function genChatLog(user, time, board, id) {
    let chatLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: user+"がChatを送信しました"}).appendTo(chatLogContent)
    $("<span>", {text: "●  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time.slice(0,5)}).appendTo(chatLogContent)
    $(".Log").append(chatLogContent)
}


// RewriteLogを追加
function genRewriteLog(user, time, board, id) {
    let rewriteLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: user+"がChatを編集しました"}).appendTo(rewriteLogContent)
    $("<span>", {text: "○  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time.slice(0,5)}).appendTo(rewriteLogContent)
    $(".Log").append(rewriteLogContent)
}


// SemanticLogを追加
function genSemanticLog(user, time, board, semantic, rgba, id) {
    let semanticLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: user+'が"'+semantic+'"をタグ付けしました'}).appendTo(semanticLogContent)
    $("<span>", {text: "●  "}).css({'color':rgba, 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time.slice(0,5)}).appendTo(semanticLogContent)
    $(".Log").append(semanticLogContent)
}


// RemovedLogを追加
function genRemovedLog(user, time, board, id) {
    let removedLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: user+"がChatを削除しました"}).appendTo(removedLogContent)
    $("<span>", {text: "▲  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time.slice(0,5)}).appendTo(removedLogContent)
    $(".Log").append(removedLogContent)
}

// ----------------------------------------------------------------------------------------------------> Method








// Firebase <----------------------------------------------------------------------------------------------------

// RealtimeDatabase "log" にデータをセット
export function setLogData(tag, user, time, text, board, semantic, id) {

    if (tag === "post") {

        const post_log = {
            tag     : "post_log",
            user    : user,
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
            user    : user,
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
            user       : user,
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
            user    : user,
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

    if (log.tag === "post_log") { genChatLog(log.user, log.time, log.board, log.id); }

    else if (log.tag === "rewrite_log") { genRewriteLog(log.user, log.time, log.board, log.id); }

    else if (log.tag === "semantic_log") {

        switch (log.semantic) {
            case "none":
                break;
            case "important":
                genSemanticLog(log.user, log.time, log.board, "重要", 'rgba(255,105,98,.8)', log.id);
                break;
            case "facilitation":
                genSemanticLog(log.user, log.time, log.board, "進行", 'rgba(136,196,228,.8)', log.id);
                break;
            case "question":
                genSemanticLog(log.user, log.time, log.board, "質疑", 'rgba(255,175,104,.8)', log.id);
                break;
            case "response":
                genSemanticLog(log.user, log.time, log.board, "応答", 'rgba(192,231,197,.8)', log.id);
                break;
            case "note":
                genSemanticLog(log.user, log.time, log.board, "メモ", 'rgba(246,230,131,.8)', log.id);
                break;
            case "answer":
                genSemanticLog(log.user, log.time, log.board, "解答", 'rgba(151,150,188,.8)', log.id);
                break;
            default:
                ;
        }
    }

    else if (log.tag === "removed_log") { genRemovedLog(log.user, log.time, log.board, log.id); }

    else {;}
});

// ----------------------------------------------------------------------------------------------------> FIrebase