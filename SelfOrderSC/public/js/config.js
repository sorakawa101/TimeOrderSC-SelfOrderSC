import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCgGfpr0tavHr3-94mWd7ovzqe73Cf9GSQ",
    authDomain: "selfordersc.firebaseapp.com",
    projectId: "selfordersc",
    storageBucket: "selfordersc.appspot.com",
    messagingSenderId: "1063744067521",
    appId: "1:1063744067521:web:d85bb31c2d2b5222998140"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
export const db = getDatabase(app); // RealTimeDatabaseに接続

export const dbRefChat = ref(db, "chat");
export const dbRefInteract = ref(db, "interact");
export const dbRefLog = ref(db, "log");
export const dbRefArchive = ref(db, "archive");
export const dbRefSetting = ref(db, "setting");
export const dbRefUser = ref(db, "user");