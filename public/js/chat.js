// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, } from "./config.js";

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
    set(newPostRef, msg);
}

// SpeechBalloon生成
function genSpeechBalloon(uname, time, text, key) {

    let speech_balloon = $("<div>", {class: 'SpeechBalloon', id: key}).addClass(key+'SpeechBalloon');


    // Chat Info

    let chat_info = $("<div>", {class: 'ChatInfo'});

    let uname_text = $("<p>", {class: 'Name'}).addClass(key+'Name');
    if(uname) {
        uname_text.text() = uname;
    } else {
        uname_text = "匿名";
    }
    chat_info.append(uname_text);

    $("<p>", {class: 'Semantic'}).addClass(key+'Semantic').appendTo(chat_info);

    $("<p>", {class: 'TimeStamp', text: time}).appendTo(chat_info);

    speech_balloon.append(chat_info);


    // Selector Menu

    let selector_menu = $("<div>", {class: 'SelectorMenu', id: key}).appendTo(speech_balloon);

    let edit_btn = $("<button>", {class: 'EditBtn SelectorBtn', id: key});
        $("<span>", {class: 'fas fa-edit fa-2x'}).appendTo(edit_btn);

    let semantic_selector_btn = $("<button>", {class: 'SemanticSelectorBtn SelectorBtn CircleBtn Inactive', id: key}).addClass(key+'SelectorBtn');
        $("<span>", {class: 'far fa-comment-dots fa-2x'}).appendTo(semantic_selector_btn);

    let trash_btn = $("<button>", {class: 'TrashBtn SelectorBtn CircleBtn Inactive', id: key}).addClass(key+'SelectorBtn');
        $("<span>", {class: 'fas fa-trash fa-2x'}).appendTo(trash_btn);

    selector_menu.append(edit_btn, semantic_selector_btn, trash_btn);


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
    let text_text = document.createElement("div");
        text_text.innerHTML = text; // テキスト内のhtmlタグを取得
        text_text = textText.firstElementChild; // 最初の子要素を取得（divタグを除去）
        text_text.classList.add(key+"Msg");

    speech_balloon.append(text_text);

    $("#output-form").append(speech_balloon);
}

// ChatLog
function genChatLog(uname, time) {
    // SemanticLog
    let chatLogContent = $("<div>", {class: 'LogContent'})
    let txt = $("<p>", {text: uname+"がChatを送信しました"}).appendTo(chatLogContent)
    $("<span>", {text: "●  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.5rem'}).prependTo(txt)
    $("<p>", {text: time}).appendTo(chatLogContent)
    $(".Log").append(chatLogContent)
}

// RewriteLog
function genRewriteLog(uname, time) {
    let rewriteLogContent = $("<div>", {class: 'LogContent'})
    let txt = $("<p>", {text: uname+"がChatを編集しました"}).appendTo(rewriteLogContent)
    $("<span>", {text: "○  "}).css({'color':'rgba(0,0,0,.8)', 'font-size':'.5rem'}).prependTo(txt)
    $("<p>", {text: time}).appendTo(rewriteLogContent)
    $(".Log").append(rewriteLogContent)
}

// ----------------------------------------------------------------------------------------------------> Method





// Chat <----------------------------------------------------------------------------------------------------

// 送信ボタンが押された時
$(".SendBtn").on("click", function() {
    setChatData();
});


// <-- RealTimeDatabase(Chat)

onChildAdded(dbRefChat,function(data) {
    const msg = data.val();
    const key = data.key; // ユニークキーを取得

    // Case. text=""
    if (msg.text === "") { return 0; }

    // SpeechBalloon

    let speech_balloon = document.createElement("div");
        speech_balloon.classList.add("SpeechBalloon", key+"SpeechBalloon");
        speech_balloon.setAttribute("id", key);

    // let speech_balloon = $('<div>', {class: 'SpeechBalloon', id: key}).addClass(key+'SpeechBalloon')

    let selector_menu = document.createElement("div");
        selector_menu.classList.add("SelectorMenu");
        selector_menu.setAttribute("id", key);
        speech_balloon.append(selector_menu);


    // Chat Info

    let chat_info = document.createElement("div");
        chat_info.classList.add("ChatInfo");


    // Name

    let unameText = document.createElement("p");
    unameText.classList.add("Name", key+"Name");
    if (msg.uname) {
        unameText.textContent = msg.uname;
    } else {
        unameText.textContent = "匿名";
    }
    chat_info.append(unameText);

    // Semantic

    let semanticText = document.createElement("p");
        semanticText.classList.add("Semantic", key+"Semantic");
        // if (msg.tag === "semantic") {
        //     semanticText.textContent = msg.semantic;
        // } else {
        //     semanticText.textContent = "<>";
        // }

        chat_info.append(semanticText);


    // TIme Stamp

    let timeText = document.createElement("p");
        timeText.classList.add("TimeStamp");
        timeText.textContent = msg.time;
        chat_info.append(timeText);

        speech_balloon.append(chat_info);


    // SpeechBalloon Btn

    let edit_btn = document.createElement("button");
        edit_btn.classList.add("EditBtn", "SelectorBtn", key+"SelectorBtn", "CircleBtn", "Inactive");
        edit_btn.setAttribute("id", key);
    let edit_btn_icon = document.createElement("span");
        edit_btn_icon.classList.add("fas", "fa-edit", "fa-2x");
        edit_btn.append(edit_btn_icon);
        selector_menu.append(edit_btn);


    // let color_selector_btn = document.createElement("button");
    //     color_selector_btn.classList.add("ColorSelectorBtn", "SelectorBtn", key+"SelectorBtn", "CircleBtn", "Inactive");
    //     color_selector_btn.setAttribute("id", key);
    // let color_selector_btn_icon = document.createElement("span");
    //     color_selector_btn_icon.classList.add("fas", "fa-palette", "fa-2x");
    //     color_selector_btn.append(color_selector_btn_icon);
    //     selector_menu.append(color_selector_btn);

    let semantic_selector_btn = document.createElement("button");
        semantic_selector_btn.classList.add("SemanticSelectorBtn", "SelectorBtn", key+"SelectorBtn", "CircleBtn", "Inactive");
        semantic_selector_btn.setAttribute("id", key);
    let semantic_selector_btn_icon = document.createElement("span");
        semantic_selector_btn_icon.classList.add("far", "fa-comment-dots", "fa-2x");
        semantic_selector_btn.append(semantic_selector_btn_icon);
        selector_menu.append(semantic_selector_btn);


    let trash_btn = document.createElement("button");
        trash_btn.classList.add("TrashBtn", "SelectorBtn", key+"SelectorBtn", "CircleBtn", "Inactive");
        trash_btn.setAttribute("id", key);
    let trash_btn_icon = document.createElement("span");
        trash_btn_icon.classList.add("fas", "fa-trash", "fa-2x");
        trash_btn.append(trash_btn_icon);
        selector_menu.append(trash_btn);


    // Color

    // let color_selector = document.createElement("div");
    //     color_selector.classList.add("ColorSelector");
    //     // speech_balloon.classList.add("SpeechBalloon");
    //     speech_balloon.append(color_selector);

    // let color_circle0 = document.createElement("button");
    //     color_circle0.classList.add("ColorCircle", key+"ColorCircle", "Inactive");
    //     color_circle0.setAttribute("id", "black");
    //     color_selector.append(color_circle0);

    // let color_circle1 = document.createElement("button");
    //     color_circle1.classList.add("ColorCircle", key+"ColorCircle", "Inactive");
    //     color_circle1.setAttribute("id", "tomato");
    //     color_selector.append(color_circle1);

    // let color_circle2 = document.createElement("button");
    //     color_circle2.classList.add("ColorCircle", key+"ColorCircle", "Inactive");
    //     color_circle2.setAttribute("id", "darkturquoise");
    //     color_selector.append(color_circle2);

    // let color_circle3 = document.createElement("button");
    //     color_circle3.classList.add("ColorCircle", key+"ColorCircle", "Inactive");
    //     color_circle3.setAttribute("id", "gold");
    //     color_selector.append(color_circle3);

    // let color_circle4 = document.createElement("button");
    //     color_circle4.classList.add("ColorCircle", key+"ColorCircle", "Inactive");
    //     color_circle4.setAttribute("id", "mediumseagreen");
    //     color_selector.append(color_circle4);

    // let color_circle5 = document.createElement("button");
    //     color_circle5.classList.add("ColorCircle", key+"ColorCircle", "Inactive");
    //     color_circle5.setAttribute("id", "gainsboro");
    //     color_selector.append(color_circle5);


    // Semantic

    // let semantic_selector = $('<div>', {class: 'SemanticSelector'})
    let semantic_selector = document.createElement("div");
        semantic_selector.classList.add("SemanticSelector");
        speech_balloon.classList.add("SpeechBalloon");
        speech_balloon.append(semantic_selector);

    let semantic_circle0 = document.createElement("button");
        semantic_circle0.classList.add("SemanticCircle", key+"SemanticCircle", "Inactive");
        semantic_circle0.setAttribute("id", "none");
        semantic_circle0.textContent = "None";
        semantic_selector.append(semantic_circle0);

    let semantic_circle1 = document.createElement("button");
        semantic_circle1.classList.add("SemanticCircle", key+"SemanticCircle", "Inactive");
        semantic_circle1.setAttribute("id", "idea");
        semantic_circle1.textContent = "提案";
        semantic_selector.append(semantic_circle1);

    let semantic_circle2 = document.createElement("button");
        semantic_circle2.classList.add("SemanticCircle", key+"SemanticCircle", "Inactive");
        semantic_circle2.setAttribute("id", "facilitation");
        semantic_circle2.textContent = "進行";
        semantic_selector.append(semantic_circle2);

    let semantic_circle3 = document.createElement("button");
        semantic_circle3.classList.add("SemanticCircle", key+"SemanticCircle", "Inactive");
        semantic_circle3.setAttribute("id", "question");
        semantic_circle3.textContent = "質疑";
        semantic_selector.append(semantic_circle3);

    let semantic_circle4 = document.createElement("button");
        semantic_circle4.classList.add("SemanticCircle", key+"SemanticCircle", "Inactive");
        semantic_circle4.setAttribute("id", "answer");
        semantic_circle4.textContent = "応答";
        semantic_selector.append(semantic_circle4);

    let semantic_circle5 = document.createElement("button");
        semantic_circle5.classList.add("SemanticCircle", key+"SemanticCircle", "Inactive");
        semantic_circle5.setAttribute("id", "comment");
        semantic_circle5.textContent = "感想";
        semantic_selector.append(semantic_circle5);

    let semantic_circle6 = document.createElement("button");
        semantic_circle6.classList.add("SemanticCircle", key+"SemanticCircle", "Inactive");
        semantic_circle6.setAttribute("id", "information");
        semantic_circle6.textContent = "連絡";
        semantic_selector.append(semantic_circle6);


    // Text

    let textText = document.createElement("div");
        textText.innerHTML = msg.text; // テキスト内のhtmlタグを取得
        textText = textText.firstElementChild; // 最初の子要素を取得（divタグを除去）
        textText.classList.add(key+"Msg");

        // speech_balloon.append(unameText);
        speech_balloon.append(textText);

        $("#output-form").append(speech_balloon);

    // genSpeechBalloon(msg.uname, msg.time, msg.text, key);

    genChatLog(msg.uname, msg.time); // Log

    // 送信したら入力されたテキストを削除
    let textForm = document.getElementById("uname");
        textForm.value = '';
        tinyMCE.get("text").setContent('');


    // SpeechBalloonの初期設定
    $("."+ key +"SpeechBalloon").css({
        'min-width': '200px',
        'min-height': '70px',
        'border': 'solid 1px black',
        'background-color': 'rgba(227,228,232,.6)',
        'position': 'absolute',
        'top': Math.random(30),
        'left': Math.random(30)
    });

});


onChildChanged(dbRefChat,function(data) {
    // console.log("rewritten");
    const msg = data.val();
    const key = data.key; // ユニークキーを取得

    let unameText = document.createElement("p");
        unameText.classList.add("Name", key+"Name");
    if (msg.uname) {
        unameText.textContent = msg.uname;
    } else {
        unameText.textContent = "匿名";
    }

    let textText = document.createElement("div");
    textText.innerHTML = msg.text; // テキスト内のhtmlタグを取得
    textText = textText.firstElementChild; // 最初の子要素を取得（divタグを除去）
    textText.classList.add(msg.id+"Msg");

    $("."+msg.id+"Name").replaceWith(unameText)
    $("."+msg.id+"Msg").replaceWith(textText)
    $("#rewrite-btn").toggleClass("Inactive")
    $("#uname").css('margin', '10px 250px 10px 10px')

    genRewriteLog(msg.uname, msg.time) // RewriteLog

    // 送信したら入力されたテキストを削除
    let textForm = document.getElementById("uname");
        textForm.value = '';
        tinyMCE.get("text").setContent('');
});
// ----------------------------------------------------------------------------------------------------> Chat