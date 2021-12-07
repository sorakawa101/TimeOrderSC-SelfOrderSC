import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyDx83jBqglixNfP845S75QiALkHZaQQilo",
    authDomain: "timeordersc.firebaseapp.com",
    databaseURL: "https://timeordersc-default-rtdb.firebaseio.com",
    projectId: "timeordersc",
    storageBucket: "timeordersc.appspot.com",
    messagingSenderId: "222783552101",
    appId: "1:222783552101:web:fea9d415e7ba204fc2648c"
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