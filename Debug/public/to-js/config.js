import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBmu_4N4-3bvPwTK6yj6us9c2dP6Gh9rnw",
    authDomain: "debug-a2265.firebaseapp.com",
    projectId: "debug-a2265",
    storageBucket: "debug-a2265.appspot.com",
    messagingSenderId: "410903637684",
    appId: "1:410903637684:web:6873e07a235deadd34f1e1"
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