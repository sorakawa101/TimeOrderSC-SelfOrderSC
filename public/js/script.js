// Import <----------------------------------------------------------------------------------------------------

import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
import {firebaseConfig, app, db, dbRefChat, dbRefInteract, dbRefLog, dbRefArchive} from "./config.js";

// ----------------------------------------------------------------------------------------------------> Import




// Btn <----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------> Btn




// Menu <----------------------------------------------------------------------------------------------------

// Header Menu

$(".pdfMenuBtn").on("click", function() {
    $(".pdfWrapper").toggleClass("Inactive");
    $("#pdf-switch-btn").toggleClass("Inactive");
});

$(".InputMenuBtn").on("click", function() {
    $(".InputWrapper").toggleClass("Inactive");
});

$(".FacilitateMenuBtn").on("click", function() {
    $(".FacilitateWrapper").toggleClass("Inactive");
});

$(".LogMenuBtn").on("click", function() {
    $(".LogWrapper").toggleClass("Inactive");
});

$(".ResetMenuBtn").on("click", function() {
    remove(dbRefChat);
    remove(dbRefInteract);
    remove(dbRefLog);
    remove(dbRefArchive);
});


// When Double Click, Close Menu

$(".InputWrapper").on("dblclick", function() {
    $(this).toggleClass("Inactive");
});

$(".DrawWrapper").on("dblclick", function() {
    $(this).toggleClass("Inactive");
    $("#canvas").toggleClass("Inactive");
});

// ----------------------------------------------------------------------------------------------------> Menu




// Switch <----------------------------------------------------------------------------------------------------

// pdf切り替え
$("#pdf-switch-btn").on("click", function(e) {

    e.preventDefault();

    if ($("#doc").hasClass("Active")) {
        $("#doc").toggleClass("Active Inactive");
        $("#doc2").toggleClass("Active Inactive");
    } else if ($("#doc2").hasClass("Active")) {
        $("#doc2").toggleClass("Active Inactive");
        $("#doc3").toggleClass("Active Inactive");
    } else {
        $("#doc3").toggleClass("Active Inactive");
        $("#doc").toggleClass("Active Inactive");
    }

})

// ----------------------------------------------------------------------------------------------------> Switch
