// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHxyk6K6OZpVH6oanRk8hMRtFB5tiDNr0",
  authDomain: "chat-app-80f38.firebaseapp.com",
  projectId: "chat-app-80f38",
  storageBucket: "chat-app-80f38.appspot.com",
  messagingSenderId: "878678760775",
  appId: "1:878678760775:web:bf22eac06030da068f0062",
  measurementId: "G-60F338GCTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);