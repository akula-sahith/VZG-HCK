// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyATuUkYwvMfSdD8Jzq596oyDDzJwzi3HxQ",
    authDomain: "vizag-hackathon.firebaseapp.com",
    projectId: "vizag-hackathon",
    storageBucket: "vizag-hackathon.firebasestorage.app",
    messagingSenderId: "533672139151",
    appId: "1:533672139151:web:8f0b2fa1ccd9ef4355d3fa",
    measurementId: "G-29YHLJPZ5Q"
};
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
