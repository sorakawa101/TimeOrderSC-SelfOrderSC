import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


export const member = ['笹川', '前本','後藤', '堤', '出口', '永井', '名執', '東川']


// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBSfnOsYRKPXDrA-J_izG3BdEMliKeeb7Q",
    authDomain: "fir-741f1.firebaseapp.com",
    projectId: "fir-741f1",
    storageBucket: "fir-741f1.appspot.com",
    messagingSenderId: "535400324359",
    appId: "1:535400324359:web:2263a97854fc3440ef79a2"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
export const db = getDatabase(app); // RealTimeDatabaseに接続



// General
export const dbRefChat = ref(db, "general/time-order/chat");
export const dbRefInteract = ref(db, "general/time-order/interact");
export const dbRefLog = ref(db, "general/time-order/log");
export const dbRefArchive = ref(db, "general/time-order/archive");
export const dbRefSetting = ref(db, "general/time-order/setting");
export const dbRefUser = ref(db, "general/time-order/user");


// RecorderEval
export const dbRefRecorderEvalResult = ref(db, "Eval/time-order/Recorder");


// RaterEval
export const dbRefRaterEvalResult = ref(db, "Eval/time-order/Rater");


// Sum
export const dbRefResultSum = ref(db, "全員/time-order/result");


// undefinedのDB
export const dbRefChat0 = ref(db, "undefined/time-order/chat");
export const dbRefInteract0 = ref(db, "undefined/time-order/interact");
export const dbRefResult0 = ref(db, "undefined/time-order/result");



// 1人目のDB
export const dbRefChat1 = ref(db, member[0]+"/time-order/chat");
export const dbRefInteract1 = ref(db, member[0]+"/time-order/interact");
export const dbRefResult1 = ref(db, member[0]+"/time-order/result");



// 2人目のDB
export const dbRefChat2 = ref(db, member[1]+"/time-order/chat");
export const dbRefInteract2 = ref(db, member[1]+"/time-order/interact");
export const dbRefResult2 = ref(db, member[1]+"/time-order/result");



// 3人目のDB
export const dbRefChat3 = ref(db, member[2]+"/time-order/chat");
export const dbRefInteract3 = ref(db, member[2]+"/time-order/interact");
export const dbRefResult3 = ref(db, member[2]+"/time-order/result");



// 4人目のDB
export const dbRefChat4 = ref(db, member[3]+"/time-order/chat");
export const dbRefInteract4 = ref(db, member[3]+"/time-order/interact");
export const dbRefResult4 = ref(db, member[3]+"/time-order/result");


// 5人目のDB
export const dbRefChat5 = ref(db, member[4]+"/time-order/chat");
export const dbRefInteract5 = ref(db, member[4]+"/time-order/interact");
export const dbRefResult5 = ref(db, member[4]+"/time-order/result");


// 6人目のDB
export const dbRefChat6 = ref(db, member[5]+"/time-order/chat");
export const dbRefInteract6 = ref(db, member[5]+"/time-order/interact");
export const dbRefResult6 = ref(db, member[5]+"/time-order/result");

// 7人目のDB
export const dbRefChat7 = ref(db, member[6]+"/time-order/chat");
export const dbRefInteract7 = ref(db, member[6]+"/time-order/interact");
export const dbRefResult7 = ref(db, member[6]+"/time-order/result");


// 8人目のDB
export const dbRefChat8 = ref(db, member[7]+"/time-order/chat");
export const dbRefInteract8 = ref(db, member[7]+"/time-order/interact");
export const dbRefResult8 = ref(db, member[7]+"/time-order/result");
