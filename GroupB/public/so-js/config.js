import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCRYiRlgS9ddTILqy7o0yzwUIOcb34sUrw",
    authDomain: "groupb-c4c38.firebaseapp.com",
    databaseURL: "https://groupb-c4c38-default-rtdb.firebaseio.com",
    projectId: "groupb-c4c38",
    storageBucket: "groupb-c4c38.appspot.com",
    messagingSenderId: "519656629270",
    appId: "1:519656629270:web:4c2bea030ada014173c137"
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