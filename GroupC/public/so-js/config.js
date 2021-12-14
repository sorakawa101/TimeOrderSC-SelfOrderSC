import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyDOahI9VAZmBvdqNgkAc5sWcRNyj11ik1E",
    authDomain: "groupa-51b27.firebaseapp.com",
    projectId: "groupa-51b27",
    storageBucket: "groupa-51b27.appspot.com",
    messagingSenderId: "116645467169",
    appId: "1:116645467169:web:013c385b68b5376f247f60"
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