// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefEffect } from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------

// Firebaseの"chat"にデータ送信
export function setEffectData(tag, id) {

    if (tag === "log") {

        const log_effect = {
            tag     : "hover",
            id      : id
        }

        const newPostRef = push(dbRefEffect); // ユニークキーを生成
        set(newPostRef, log_effect);

    } else {;}
}


// ----------------------------------------------------------------------------------------------------> Method



// RealTimeDatabase

onChildAdded(dbRefEffect,function(data) {
    const effect = data.val();
    const key = data.key; // ユニークキーを取得

    if (effect.tag === "hover") {
        $("."+ effect.id +"SpeechBalloon").css('background-color', 'rgba(255,105,98,.6)');
        console.log(effect.id);
    }

    else {;}
});