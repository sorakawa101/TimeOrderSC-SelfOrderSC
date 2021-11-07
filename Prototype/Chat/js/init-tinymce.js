tinyMCE.init({
    selector: "textarea.tinymce",
    language: "ja",
    language_url: "./js/tinymce/langs/ja.js",
    plugins: " table lists advlist link wordcount emoticons image insertdatetime",
    menubar: false,
    toolbar: ['undo redo | bold italic | forecolor backcolor | fontsizeselect | styleselect | numlist bullist | emoticons |  image | table | link | insertdatetime'],
    fontsize_formats: '10px 12px 14px 16px 18px 20px 24px 34px',
    lists_indent_on_tab: false,
    branding: false // POWERED BY TINYのリンク非表示
});