tinyMCE.init({
    selector: "textarea.tinymce",
    language: "ja",
    language_url: "./js/tinymce/langs/ja.js",
    plugins: " table lists advlist link wordcount emoticons image insertdatetime",
    menubar: false,
    toolbar: ['undo redo | bold italic | forecolor backcolor | fontsizeselect | styleselect | numlist bullist | emoticons |  image | table | link | insertdatetime'],
    fontsize_formats: '10px 12px 14px 16px 18px 20px 24px 34px',
    height: 150,
    lists_indent_on_tab: false,
    branding: false, // POWERED BY TINYのリンク非表示

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
});