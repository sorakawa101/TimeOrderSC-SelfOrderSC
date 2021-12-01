// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive } from "./config.js";
import {setLogData} from "./log.js";


// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------

// Firebaseの"chat"にデータ送信
function setChatData() {
    const date = new Date();
    // const now = date.getMonth()+1 + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    // const now = ("0"+(date.getMonth()+1)).slice(-2) + "/" + ("0"+date.getDate()).slice(-2) + " " + ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);
    const now = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2);

    const msg = {
        tag : "post",
        uname : $("#uname").val(),
        time: now,
        // text : $("#text").val()
        // text : tinyMCE.get("text").getContent({format: "text"})
        text: tinyMCE.get("text").getContent()
    }

    const newPostRef = push(dbRefChat); // ユニークキーを生成
    const newPostKey = newPostRef.key;
    set(newPostRef, msg);

    if (msg.uname === "") { msg.uname = "匿名"; } else {;}

    setLogData(msg.tag, msg.uname, msg.time, msg.text, null, newPostKey); // Log

    // console.log(newPostKey);
}


// SpeechBalloon生成
function genSpeechBalloon(uname, time, txt, key) {

    // SpeechBalloon

    let speech_balloon = $("<div>", {class: 'SpeechBalloon', id: key}).addClass(key+'SpeechBalloon');


    // Chat Info

    let chat_info = $("<div>", {class: 'ChatInfo'});

    let uname_text = $("<p>", {class: 'Name'}).addClass(key+'Name');
    if(uname) {
        uname_text.text(uname);
    } else {
        uname_text.text("匿名");
    }
    chat_info.append(uname_text);

    $("<p>", {class: 'Semantic'}).addClass(key+'Semantic').appendTo(chat_info);
    $("<p>", {class: 'TimeStamp', text: time}).appendTo(chat_info);

    speech_balloon.append(chat_info);


    // Status Menu

    let status_menu = $("<div>", {class: 'StatusMenu', id: key}).appendTo(speech_balloon);

    let check_btn = $("<button>", {class: 'CheckBtn SelectorBtn HalfCircleBtn HintBtn Inactive', id: key}).addClass(key+'SelectorBtn');
        $("<span>", {class: 'fas fa-check'}).appendTo(check_btn);
        $("<span>", {class: 'Hint HintLeft', text: '既読'}).appendTo(check_btn);
    let trash_btn = $("<button>", {class: 'TrashBtn SelectorBtn HalfCircleBtn HintBtn Inactive', id: key}).addClass(key+'SelectorBtn');
        $("<span>", {class: 'fas fa-times'}).appendTo(trash_btn);
        $("<span>", {class: 'Hint HintLeft', text: '削除'}).appendTo(trash_btn);

    status_menu.append(check_btn, trash_btn);


    // Selector Menu

    let selector_menu = $("<div>", {class: 'SelectorMenu', id: key}).appendTo(speech_balloon);

    let edit_btn = $("<button>", {class: 'EditBtn SelectorBtn CircleBtn HintBtn Inactive', id: key}).addClass(key+'SelectorBtn').addClass(key+'EditBtn');
        $("<span>", {class: 'fas fa-edit fa-2x'}).appendTo(edit_btn);
        $("<span>", {class: 'Hint HintRight', text: '編集'}).appendTo(edit_btn);
    let semantic_selector_btn = $("<button>", {class: 'SemanticSelectorBtn SelectorBtn CircleBtn HintBtn Inactive', id: key}).addClass(key+'SelectorBtn');
        $("<span>", {class: 'far fa-comment-dots fa-2x'}).appendTo(semantic_selector_btn);
        $("<span>", {class: 'Hint HintRight', text: '意図'}).appendTo(semantic_selector_btn);

    selector_menu.append(edit_btn, semantic_selector_btn);


    // Semantic

    let semantic_selector = $("<div>", {class: 'SemanticSelector'}).appendTo(speech_balloon);

    $("<button>", {class: 'SemanticCircle Inactive', id: 'none', text: "None"}).addClass(key+'SemanticCircle').appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'idea', text: "提案"}).addClass(key+'SemanticCircle').appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'facilitation', text: "進行"}).addClass(key+'SemanticCircle').appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'question', text: "質疑"}).addClass(key+'SemanticCircle').appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'answer', text: "応答"}).addClass(key+'SemanticCircle').appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'comment', text: "感想"}).addClass(key+'SemanticCircle').appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'information', text: "連絡"}).addClass(key+'SemanticCircle').appendTo(semantic_selector);


    // Text

    let text_text = $("<p>", {class: 'Msg', id: 'msg'}).addClass(key+'Msg').html(txt);

    // let text_text = document.createElement("div");
    //     text_text.innerHTML = txt; // テキスト内のhtmlタグを取得
    //     text_text = text_text.firstElementChild; // 最初の子要素を取得（divタグを除去）
    //     text_text.classList.add(key+"Msg");


    speech_balloon.append(text_text);

    // $("#board").append(speech_balloon);
    $(".Board.Active").append(speech_balloon);

}

// ----------------------------------------------------------------------------------------------------> Method





// Chat <----------------------------------------------------------------------------------------------------

// 送信ボタンが押された時
$(".SendBtn").on("click", function() {
    setChatData();
});


onChildAdded(dbRefChat,function(data) {
    const msg = data.val();
    const key = data.key; // ユニークキーを取得

    // Case. text=""
    if (msg.text === "") { return 0; }

    genSpeechBalloon(msg.uname, msg.time, msg.text, key); // SpeechBalloonを生成

    // 送信したら入力されたテキストを削除
    // let textForm = document.getElementById("uname");
    //     textForm.value = '';
        tinyMCE.get("text").setContent('');


    // SpeechBalloonの初期設定
    $("."+ key +"SpeechBalloon").css({
        'min-width': '200px',
        'min-height': '70px',
        // 'border': 'solid 1px black',
        'background-color': 'rgba(227,228,232,.6)',
        'position': 'absolute',
        'top': 10,
        // 'left': Math.random(100),
        'left': 30,
    });

});

// ----------------------------------------------------------------------------------------------------> Chat