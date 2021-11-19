import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyB1e7dTQDCTEKfrNTSyWb63V-s408nqN_o",
    authDomain: "research-project-dad15.firebaseapp.com",
    projectId: "research-project-dad15",
    storageBucket: "research-project-dad15.appspot.com",
    messagingSenderId: "760369282337",
    appId: "1:760369282337:web:47ab3f3ebf3ca4a43b1260"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
export const db = getDatabase(app); // RealTimeDatabaseに接続
export const dbRefChat = ref(db, "chat");
export const dbRefInteract = ref(db, "interact");