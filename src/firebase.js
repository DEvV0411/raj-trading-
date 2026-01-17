import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvxLpPKL_ysW_ziRq7RZxPxM2my984ZvM",
  authDomain: "raj-trading-dee9b.firebaseapp.com",
  projectId: "raj-trading-dee9b",
  storageBucket: "raj-trading-dee9b.firebasestorage.app",
  messagingSenderId: "651150646811",
  appId: "1:651150646811:web:679b2df9680f31dc82e2be",
  measurementId: "G-7S5FQ1R137"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
