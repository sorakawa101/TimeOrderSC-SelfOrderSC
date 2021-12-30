// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, get, set, child, onChildAdded, onChildChanged, remove, onChildRemoved, update }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { db, dbRefChat, dbRefChat1, dbRefChat2, dbRefChat3, dbRefChat4, dbRefChat5, dbRefChat6, dbRefChat7, dbRefChat8 } from "./config.js";
import { setLogData } from "./log.js";
import { getNow, getUsernameFromInput, getUsernameFromSet, setResultData } from "./script.js";
import { unlockDoc, lockDoc } from "./setting.js";

// ----------------------------------------------------------------------------------------------------> Import




// Method <----------------------------------------------------------------------------------------------------

// SpeechBalloon生成
function genSpeechBalloon(uname, time, txt, board, key) {

    // SpeechBalloon

    let speech_balloon = $("<div>", {class: 'SpeechBalloon', id: key});


    // Chat Info : ユーザーネーム / セマンティックタグ / タイムスタンプ

    let chat_info = $("<div>", {class: 'ChatInfo'});

    let uname_text = $("<p>", {class: 'Name'});
    if(uname) {
        uname_text.text(uname);
    } else {
        uname_text.text("匿名");
    }
    chat_info.append(uname_text);

    $("<p>", {class: 'Semantic'}).appendTo(chat_info);
    $("<p>", {class: 'TimeStamp', text: time.slice(0,5)}).appendTo(chat_info);

    speech_balloon.append(chat_info);


    // Focus Arrow : LogがどのSpeechBalloonに対応しているかを表示

    $("<span>", {class: 'FocusArrow fas fa-angle-double-down Inactive'}).appendTo(speech_balloon);



    // Status Menu : 点数ボタン / 既読ボタン / 削除ボタン

    let status_menu = $("<div>", {class: 'StatusMenu', id: key}).appendTo(speech_balloon);

    let eval_btn = $("<button>", {class: 'EvalBtn SelectorBtn HalfCircleBtn HintBtn', id: key});
        $("<span>", {class: 'fas fa-check'}).appendTo(eval_btn);

    let check_btn = $("<button>", {class: 'CheckBtn SelectorBtn HalfCircleBtn HintBtn Inactive', id: key});
        $("<span>", {class: 'fas fa-check'}).appendTo(check_btn);
        $("<span>", {class: 'Hint HintLeft', text: '既読'}).appendTo(check_btn);
    let trash_btn = $("<button>", {class: 'TrashBtn SelectorBtn HalfCircleBtn HintBtn Inactive', id: key});
        $("<span>", {class: 'fas fa-times'}).appendTo(trash_btn);
        $("<span>", {class: 'Hint HintLeft', text: '削除'}).appendTo(trash_btn);

    status_menu.append(eval_btn, check_btn, trash_btn);


    // Selector Menu : 編集ボタン / セマンティックタグ選択ボタン

    let selector_menu = $("<div>", {class: 'SelectorMenu', id: key}).appendTo(speech_balloon);

    let edit_btn = $("<button>", {class: 'EditBtn SelectorBtn CircleBtn HintBtn Inactive', id: key});
        $("<span>", {class: 'fas fa-edit fa-2x'}).appendTo(edit_btn);
        $("<span>", {class: 'Hint HintRight', text: '編集'}).appendTo(edit_btn);
    let semantic_selector_btn = $("<button>", {class: 'SemanticSelectorBtn SelectorBtn CircleBtn HintBtn Inactive', id: key});
        $("<span>", {class: 'far fa-comment-dots fa-2x'}).appendTo(semantic_selector_btn);
        $("<span>", {class: 'Hint HintRight', text: '意図'}).appendTo(semantic_selector_btn);
    let eval_selector_btn = $("<button>", {class: 'EvalSelectorBtn SelectorBtn CircleBtn HintBtn Inactive', id: key});
        $("<span>", {class: 'fab fa-product-hunt fa-2x'}).appendTo(eval_selector_btn);
        $("<span>", {class: 'Hint HintRight', text: '評価'}).appendTo(eval_selector_btn);

    selector_menu.append(edit_btn, semantic_selector_btn, eval_selector_btn);


    // Semantic : セマンティックタグの選択欄

    let semantic_selector = $("<div>", {class: 'SemanticSelector'}).appendTo(speech_balloon);

    $("<button>", {class: 'SemanticCircle Inactive', id: 'none', text: "None"}).appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'important', text: "重要"}).appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'facilitation', text: "進行"}).appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'question', text: "質疑"}).appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'response', text: "応答"}).appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'note', text: "メモ"}).appendTo(semantic_selector);
    $("<button>", {class: 'SemanticCircle Inactive', id: 'answer', text: "解答"}).appendTo(semantic_selector);


    // Eval : チャットの有用性

    let eval_selector = $("<div>", {class: 'EvalSelector'}).appendTo(speech_balloon);

    $("<button>", {class: 'EvalCircle Inactive', id: 'useful', text: "有用"}).appendTo(eval_selector);
    $("<button>", {class: 'EvalCircle Inactive', id: 'useless', text: "無用"}).appendTo(eval_selector);


    // Who : 誰がそのSpeechBalloonを操作しているか

    $("<span>", {class: 'Who WhoTop Inactive', text: '匿名'}).appendTo(speech_balloon);

    // Text : 送信したメッセージ

    let text_text = $("<p>", {class: 'Msg', id: 'msg'}).html(txt);

    speech_balloon.append(text_text);

    // let text_text = document.createElement("div");
    //     text_text.innerHTML = txt; // テキスト内のhtmlタグを取得
    //     text_text = text_text.firstElementChild; // 最初の子要素を取得（divタグを除去）
    //     text_text.classList.add(key+"Msg");


    // SpeechBalloonをホワイトボードに追加

    // $(".Board.Active").append(speech_balloon);
    $("#"+board).append(speech_balloon);

}


function onChildAddedMethod(msg, key) {

    const posX = Number(msg.time.slice(7))*20;
    const posY = Number(msg.time.slice(7))%4*40;


    genSpeechBalloon(msg.uname, msg.time, msg.text, msg.board, key); // SpeechBalloonを生成

    // 送信したら入力されたテキストを削除
    // let textForm = document.getElementById("uname");
    //     textForm.value = '';
    if (msg.text === tinyMCE.get("text").getContent()) {
        tinyMCE.get("text").setContent('');
    }

    // "練習スタート"が送信されたらテストのPDFをクリックできるようになる
    if (msg.text === "練習スタート"){
        unlockDoc("doc5");
        unlockDoc("mini-doc-p");
    }

    // "本番スタート"が送信されたら本番のPDFをクリックできるようになる
    if (msg.text === "本番スタート"){
        unlockDoc("doc6");
        unlockDoc("mini-doc-q");
    }

    // "予備スタート"が送信されたら予備のPDFをクリックできるようになる
    if (msg.text === "予備スタート"){
        unlockDoc("doc7");
        unlockDoc("mini-doc-s");
    }

    // "lock"が送信されたらPDFをクリックできなくなる
    if(msg.text === "lock") {
        lockDoc();
    }


    // SpeechBalloonの初期設定
    $("#"+ key).css({
        'width'         : '270px',
        'background-color'  : 'rgba(227,228,232,.6)',
        // 'float'             : 'center'
        // 'position'          : 'absolute',
        // 'top'               : '10px',
        // 'left'              : '300px'
        // 'top'               : posY,
        // 'left'              : posX,
    });

    if (!$(".pdfWrapper").hasClass('Inactive')) {
        $("#"+ key).css('left', '580')
    }

    // setResultData(user, "chat");

    $("Board").scrollTop(0)

}

// ----------------------------------------------------------------------------------------------------> Method








// Firebase <----------------------------------------------------------------------------------------------------

// RealtimeDatabase "chat" にチャットデータをセット
export function setChatData() {

    const msg = {
        tag     : "post",
        uname   : getUsernameFromInput(),
        user    : getUsernameFromSet(),
        time    : getNow(),
        // text : $("#text").val()
        // text : tinyMCE.get("text").getContent({format: "text"})
        text    : tinyMCE.get("text").getContent(),
        board   : $(".Board.Active").attr('id')
    }

    const user = getUsernameFromSet();
    const dbRef = ref(db, user+'/self-order/chat');

    const newPostRef = push(dbRef); // ユニークキーを生成
    const newPostKey = newPostRef.key; // ユニークキーを取得

    set(newPostRef, msg); // ユニークキーを使ってデータをセット

    setLogData(msg.tag, msg.user, msg.time, msg.text, msg.board, null, newPostKey); // RealtimeDatabase "log" にチャットデータをセット

    setResultData(user, "chat");

}




// RealTimeDatabase "Chat" に要素が追加されたときに実行

onChildAdded(dbRefChat,function(data) {
    const msg = data.val();
    const key = data.key;

    onChildAddedMethod(msg, key);
});

onChildAdded(dbRefChat1,function(data) {
    const msg = data.val();
    const key = data.key;

    onChildAddedMethod(msg, key);
});

onChildAdded(dbRefChat2,function(data) {
    const msg = data.val();
    const key = data.key;

    onChildAddedMethod(msg, key);
});

onChildAdded(dbRefChat3,function(data) {
    const msg = data.val();
    const key = data.key;

    onChildAddedMethod(msg, key);
});

onChildAdded(dbRefChat4,function(data) {
    const msg = data.val();
    const key = data.key;

    onChildAddedMethod(msg, key);
});

onChildAdded(dbRefChat5,function(data) {
    const msg = data.val();
    const key = data.key;

    onChildAddedMethod(msg, key);
});

onChildAdded(dbRefChat6,function(data) {
    const msg = data.val();
    const key = data.key;

    onChildAddedMethod(msg, key);
});

onChildAdded(dbRefChat7,function(data) {
    const msg = data.val();
    const key = data.key;

    onChildAddedMethod(msg, key);
});

onChildAdded(dbRefChat8,function(data) {
    const msg = data.val();
    const key = data.key;

    onChildAddedMethod(msg, key);
});
// ----------------------------------------------------------------------------------------------------> FIrebase