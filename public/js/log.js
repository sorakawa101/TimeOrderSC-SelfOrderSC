// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive } from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------

// ChatLogを追加
function genChatLog(uname, time, id) {
    let chatLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: uname+"がChatを送信しました"}).appendTo(chatLogContent)
    $("<span>", {text: "●  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time}).appendTo(chatLogContent)
    $(".Log").append(chatLogContent)
}


// RewriteLogを追加
function genRewriteLog(uname, time, id) {
    let rewriteLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: uname+"がChatを編集しました"}).appendTo(rewriteLogContent)
    $("<span>", {text: "○  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time}).appendTo(rewriteLogContent)
    $(".Log").append(rewriteLogContent)
}


// SemanticLogを追加
function genSemanticLog(uname, time, semantic, rgba, id) {
    let semanticLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: uname+"から"+semantic+"があります"}).appendTo(semanticLogContent)
    $("<span>", {text: "●  "}).css({'color':rgba, 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time}).appendTo(semanticLogContent)
    $(".Log").append(semanticLogContent)
}


// RemovedLogを追加
function genRemovedLog(uname, time, id) {
    let removedLogContent = $("<div>", {class: 'LogContent'}).addClass('LogContent'+id)
    let txt = $("<p>", {text: uname+"がChatを削除しました"}).appendTo(removedLogContent)
    $("<span>", {text: "▲  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.8rem'}).prependTo(txt)
    $("<p>", {text: time}).appendTo(removedLogContent)
    $(".Log").append(removedLogContent)
}

// $(".LogContent").mouseover(function() {
        //     // console.log($(this).attr('class'));
        //     console.log("hover");
        // });

        // mouseover処理は↓こう書かないと動かない（↑はダメ）

// $(document).on("click", ".LogContent", function() {
//     let id = $(this).attr('class').split(' ')[1].slice(10,-1) // 2番目の classを取得
//     setEffectData("log", id);
//     // console.log('set')
// })

// ----------------------------------------------------------------------------------------------------> Method








// Firebase <----------------------------------------------------------------------------------------------------

// RealtimeDatabase "log" にデータをセット
export function setLogData(tag, uname, time, text, semantic, id) {

    if (tag === "post") {

        const post_log = {
            tag     : "post_log",
            uname   : uname,
            time    : time,
            text    : text,
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

    if (log.tag === "post_log") { genChatLog(log.uname, log.time, log.id); }

    else if (log.tag === "rewrite_log") { genRewriteLog(log.uname, log.time, log.id); }

    else if (log.tag === "semantic_log") {

        switch (log.semantic) {
            case "none":
                break;
            case "idea":
                genSemanticLog(log.uname, log.time, "提案", 'rgba(255,105,98,.8)', log.id);
                break;
            case "facilitation":
                genSemanticLog(log.uname, log.time, "進行", 'rgba(136,196,228,.8)', log.id);
                break;
            case "question":
                genSemanticLog(log.uname, log.time, "質疑", 'rgba(255,175,104,.8)', log.id);
                break;
            case "answer":
                genSemanticLog(log.uname, log.time, "応答", 'rgba(192,231,197,.8)', log.id);
                break;
            case "comment":
                genSemanticLog(log.uname, log.time, "感想", 'rgba(246,230,131,.8)', log.id);
                break;
            case "information":
                genSemanticLog(log.uname, log.time, "連絡", 'rgba(151,150,188,.8)', log.id);
                break;
            default:
                ;
        }
    }

    else if (log.tag === "removed_log") { genRemovedLog(log.uname, log.time, log.id); }

    else {;}
});

// ----------------------------------------------------------------------------------------------------> FIrebase