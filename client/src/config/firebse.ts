// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY_FIREBASE,
  authDomain: "project-m26-vue.firebaseapp.com",
  projectId: "project-m26-vue",
  storageBucket: "project-m26-vue.appspot.com",
  messagingSenderId: "112135733859",
  appId: "1:112135733859:web:56e1e20f581001eca8ae56",
  measurementId: "G-QGTLL2YVXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);