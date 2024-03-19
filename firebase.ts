import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDlTuMYoo1P_kcnJux2m5Y8Ym8L67AtA8c",
  authDomain: "mernblog-snd.firebaseapp.com",
  projectId: "mernblog-snd",
  storageBucket: "mernblog-snd.appspot.com",
  messagingSenderId: "500890446757",
  appId: "1:500890446757:web:7678ef7a15ade42ea1164c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
