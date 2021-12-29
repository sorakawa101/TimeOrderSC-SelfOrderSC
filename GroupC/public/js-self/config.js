import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


export const member = ['笹川', '安岡','小林', '小川', '出口', '永井', '名執', '東川']

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




// General
export const dbRefLog = ref(db, "general/self-order/log");
export const dbRefArchive = ref(db, "general/self-order/archive");
export const dbRefSetting = ref(db, "general/self-order/setting");
export const dbRefUser = ref(db, "general/self-order/user");


// RecorderEval
export const dbRefRecorderEvalResult = ref(db, "Eval/self-order/Recorder");


// RecorderEval
export const dbRefRaterEvalResult = ref(db, "Eval/self-order/Rater");


// Sum
export const dbRefResultSum = ref(db, "全員/self-order/result");


// undefinedのDB
export const dbRefChat = ref(db, "undefined/self-order/chat");
export const dbRefInteract = ref(db, "undefined/self-order/interact");
export const dbRefResult = ref(db, "undefined/self-order/result");



// 1人目のDB
export const dbRefChat1 = ref(db, member[0]+"/self-order/chat");
export const dbRefInteract1 = ref(db, member[0]+"/self-order/interact");
export const dbRefResult1 = ref(db, member[0]+"/self-order/result");



// 2人目のDB
export const dbRefChat2 = ref(db, member[1]+"/self-order/chat");
export const dbRefInteract2 = ref(db, member[1]+"/self-order/interact");
export const dbRefResult2 = ref(db, member[1]+"/self-order/result");



// 3人目のDB
export const dbRefChat3 = ref(db, member[2]+"/self-order/chat");
export const dbRefInteract3 = ref(db, member[2]+"/self-order/interact");
export const dbRefResult3 = ref(db, member[2]+"/self-order/result");



// 4人目のDB
export const dbRefChat4 = ref(db, member[3]+"/self-order/chat");
export const dbRefInteract4 = ref(db, member[3]+"/self-order/interact");
export const dbRefResult4 = ref(db, member[3]+"/self-order/result");


// 5人目のDB
export const dbRefChat5 = ref(db, member[4]+"/self-order/chat");
export const dbRefInteract5 = ref(db, member[4]+"/self-order/interact");
export const dbRefResult5 = ref(db, member[4]+"/self-order/result");


// 6人目のDB
export const dbRefChat6 = ref(db, member[5]+"/self-order/chat");
export const dbRefInteract6 = ref(db, member[5]+"/self-order/interact");
export const dbRefResult6 = ref(db, member[5]+"/self-order/result");


// 7人目のDB
export const dbRefChat7 = ref(db, member[6]+"/self-order/chat");
export const dbRefInteract7 = ref(db, member[6]+"/self-order/interact");
export const dbRefResult7 = ref(db, member[6]+"/self-order/result");


// 8人目のDB
export const dbRefChat8 = ref(db, member[7]+"/self-order/chat");
export const dbRefInteract8 = ref(db, member[7]+"/self-order/interact");
export const dbRefResult8 = ref(db, member[7]+"/self-order/result");


