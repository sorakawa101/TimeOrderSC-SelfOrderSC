import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, onChildChanged, remove, onChildRemoved }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const member = ['橋山', '小川','笹川', '堤', '林', '名執']

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCDNnO-91JzJRKOjXLZGGKOuwip2Op3p70",
    authDomain: "prototype-96226.firebaseapp.com",
    projectId: "prototype-96226",
    storageBucket: "prototype-96226.appspot.com",
    messagingSenderId: "690970283986",
    appId: "1:690970283986:web:dadf1cb10b32b56db6420b"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig); // Keyを使ってFirebaseに接続
export const db = getDatabase(app); // RealTimeDatabaseに接続


// undefinedのDB
export const dbRefChat = ref(db, "undefined/self-order/chat");
export const dbRefInteract = ref(db, "undefined/self-order/interact");
export const dbRefLog = ref(db, "undefined/self-order/log");
export const dbRefArchive = ref(db, "undefined/self-order/archive");
export const dbRefSetting = ref(db, "undefined/self-order/setting");
export const dbRefUser = ref(db, "undefined/self-order/user");
export const dbRefResult = ref(db, "undefined/self-order/result");


// 1人目のDB
export const dbRefChat1 = ref(db, member[0]+"/self-order/chat");
export const dbRefInteract1 = ref(db, member[0]+"/self-order/interact");
export const dbRefLog1 = ref(db, member[0]+"/self-order/log");
export const dbRefArchive1 = ref(db, member[0]+"/self-order/archive");
export const dbRefSetting1 = ref(db, member[0]+"/self-order/setting");
export const dbRefUser1 = ref(db, member[0]+"/self-order/user");
export const dbRefResult1 = ref(db, member[0]+"/self-order/result");



// 2人目のDB
export const dbRefChat2 = ref(db, member[1]+"/self-order/chat");
export const dbRefInteract2 = ref(db, member[1]+"/self-order/interact");
export const dbRefLog2 = ref(db, member[1]+"/self-order/log");
export const dbRefArchive2 = ref(db, member[1]+"/self-order/archive");
export const dbRefSetting2 = ref(db, member[1]+"/self-order/setting");
export const dbRefUser2 = ref(db, member[1]+"/self-order/user");
export const dbRefResult2 = ref(db, member[1]+"/self-order/result");



// 3人目のDB
export const dbRefChat3 = ref(db, member[2]+"/self-order/chat");
export const dbRefInteract3 = ref(db, member[2]+"/self-order/interact");
export const dbRefLog3 = ref(db, member[2]+"/self-order/log");
export const dbRefArchive3 = ref(db, member[2]+"/self-order/archive");
export const dbRefSetting3 = ref(db, member[2]+"/self-order/setting");
export const dbRefUser3 = ref(db, member[2]+"/self-order/user");
export const dbRefResult3 = ref(db, member[2]+"/self-order/result");



// 4人目のDB
export const dbRefChat4 = ref(db, member[3]+"/self-order/chat");
export const dbRefInteract4 = ref(db, member[3]+"/self-order/interact");
export const dbRefLog4 = ref(db, member[3]+"/self-order/log");
export const dbRefArchive4 = ref(db, member[3]+"/self-order/archive");
export const dbRefSetting4 = ref(db, member[3]+"/self-order/setting");
export const dbRefUser4 = ref(db, member[3]+"/self-order/user");


// 5人目のDB
export const dbRefChat5 = ref(db, member[4]+"/self-order/chat");
export const dbRefInteract5 = ref(db, member[4]+"/self-order/interact");
export const dbRefLog5 = ref(db, member[4]+"/self-order/log");
export const dbRefArchive5 = ref(db, member[4]+"/self-order/archive");
export const dbRefSetting5 = ref(db, member[4]+"/self-order/setting");
export const dbRefUser5 = ref(db, member[4]+"/self-order/user");


// 6人目のDB
export const dbRefChat6 = ref(db, member[5]+"/self-order/chat");
export const dbRefInteract6 = ref(db, member[5]+"/self-order/interact");
export const dbRefLog6 = ref(db, member[5]+"/self-order/log");
export const dbRefArchive6 = ref(db, member[5]+"/self-order/archive");
export const dbRefSetting6 = ref(db, member[5]+"/self-order/setting");
export const dbRefUser6 = ref(db, member[5]+"/self-order/user");



