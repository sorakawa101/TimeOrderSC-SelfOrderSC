import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyAJ90ZXs6QQzRtc5f3OeIu9yodQV3-TKZg",
    authDomain: "pre-ex.firebaseapp.com",
    projectId: "pre-ex",
    storageBucket: "pre-ex.appspot.com",
    messagingSenderId: "964105284492",
    appId: "1:964105284492:web:19f9cd288ad1b0e47d44a9"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
export const db = getDatabase(app); // RealTimeDatabaseに接続

export const dbRefChat = ref(db, "self-order/chat");
export const dbRefInteract = ref(db, "self-order/interact");
export const dbRefLog = ref(db, "self-order/log");
export const dbRefArchive = ref(db, "self-order/archive");
export const dbRefSetting = ref(db, "self-order/setting");
export const dbRefUser = ref(db, "self-order/user");