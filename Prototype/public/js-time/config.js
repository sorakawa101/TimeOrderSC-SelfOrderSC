import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCDNnO-91JzJRKOjXLZGGKOuwip2Op3p70",
    authDomain: "prototype-96226.firebaseapp.com",
    projectId: "prototype-96226",
    storageBucket: "prototype-96226.appspot.com",
    messagingSenderId: "690970283986",
    appId: "1:690970283986:web:fcff03b66d8768a5b6420b"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
export const db = getDatabase(app); // RealTimeDatabaseに接続

export const dbRefChat = ref(db, "time-order/chat");
export const dbRefInteract = ref(db, "time-order/interact");
export const dbRefLog = ref(db, "time-order/log");
export const dbRefArchive = ref(db, "time-order/archive");
export const dbRefSetting = ref(db, "time-order/setting");
export const dbRefUser = ref(db, "time-order/user");