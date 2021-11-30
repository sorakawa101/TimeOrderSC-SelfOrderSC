import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyDHpq5C7jhHEcs6XV0j8sTwOVGFCFnB7vw",
    authDomain: "research-2094b.firebaseapp.com",
    databaseURL: "https://research-2094b-default-rtdb.firebaseio.com",
    projectId: "research-2094b",
    storageBucket: "research-2094b.appspot.com",
    messagingSenderId: "843244079366",
    appId: "1:843244079366:web:d08d4237f347b6604db687"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
export const db = getDatabase(app); // RealTimeDatabaseに接続
export const dbRefChat = ref(db, "chat");
export const dbRefInteract = ref(db, "interact");
export const dbRefLog = ref(db, "log");
export const dbRefArchive = ref(db, "archive");
