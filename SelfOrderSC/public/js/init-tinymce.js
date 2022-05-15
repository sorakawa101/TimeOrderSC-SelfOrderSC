// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, get, set, child, onChildAdded, onChildChanged, remove, onChildRemoved, update }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import { firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive, dbRefSetting } from "./config.js";
import { getUsernameFromInput } from "./script.js";

// ----------------------------------------------------------------------------------------------------> Import




tinyMCE.init({
    // selector: "textarea.tinymce",
    language: "ja",
    language_url: "./js/tinymce/langs/ja.js",
    plugins: " table lists advlist link wordcount emoticons image insertdatetime",
    menubar: false,
    toolbar: ['undo redo | bold italic | forecolor backcolor | fontsizeselect | styleselect | numlist bullist | emoticons |  image | table | link | insertdatetime'],
    fontsize_formats: '10px 12px 14px 16px 18px 20px 24px 34px',
    width: 360,
    height: 280,
    lists_indent_on_tab: false,
    branding: false, // POWERED BY TINYのリンク非表示
    forced_root_block : '', // 改行した時,p段落でなくてbr改行する
    selector: 'textarea',  // change this value according to your HTML
    deprecation_warnings: false,

    // Cmd+Shift+p でPostBtn押下ショートカット
    setup: function (editor) {
        editor.addShortcut(
        'meta+shift+p', 'Click Post.', function () {
        $(".SendBtn").trigger('click')
        },
        // 'meta+shift+', 'Click Rewrite', function () {
        //     $("#rewrite-btn").trigger('click')
        // }
        );
    },
    init_instance_callback:function(editor) {
        editor.on('focusin',function() {
            setFocusIn();
        });
        editor.on('focusout',function() {
            setFocusOut();
        });
    }
});


// Focus In
function setFocusIn() {
    let mouse = {
        tag : "focusin",
        who : getUsernameFromInput(),
    }

    let newPostRef = push(dbRefInteract);
    set(newPostRef, mouse);
    // console.log('setFocusIn');
}


// Focus OUt
function setFocusOut() {
    let mouse = {
        tag : "focusout",
        who : getUsernameFromInput(),
    }

    let newPostRef = push(dbRefInteract);
    set(newPostRef, mouse);
    // console.log('setFocusOut');
}