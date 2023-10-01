import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG20Yl-ybYLNeHXIN_qGwtyXCHUIUjv4Q",
  authDomain: "next-firebase-todo-app-60b8d.firebaseapp.com",
  projectId: "next-firebase-todo-app-60b8d",
  storageBucket: "next-firebase-todo-app-60b8d.appspot.com",
  messagingSenderId: "116730535955",
  appId: "1:116730535955:web:08d42db53172bf28ce9fe6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);