import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaXBWaqZhfzwMr_qPDJ1CR4wYysQ-7skI",
  authDomain: "raj-trading-2f1c2.firebaseapp.com",
  projectId: "raj-trading-2f1c2",
  storageBucket: "raj-trading-2f1c2.firebasestorage.app",
  messagingSenderId: "264101549910",
  appId: "1:264101549910:web:98fed92cb468bad3da28f7",
  measurementId: "G-6T5Z9ZEGS0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
