import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyC9GhLR83kDbL4_vYqHlaCueR6z2fob8QA",
    authDomain: "groupc-1c8d1.firebaseapp.com",
    databaseURL: "https://groupc-1c8d1-default-rtdb.firebaseio.com",
    projectId: "groupc-1c8d1",
    storageBucket: "groupc-1c8d1.appspot.com",
    messagingSenderId: "229089785571",
    appId: "1:229089785571:web:cc3e0c861fb9988f08b7d6"
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