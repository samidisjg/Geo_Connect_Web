// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "af2-geo-connect.firebaseapp.com",
  projectId: "af2-geo-connect",
  storageBucket: "af2-geo-connect.firebasestorage.app",
  messagingSenderId: "849817741049",
  appId: "1:849817741049:web:a4b645f7c0250d71546428"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
