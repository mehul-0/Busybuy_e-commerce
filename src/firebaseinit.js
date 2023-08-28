// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABhimlLPEDxUC8mZZs7wN20orvh0GHatU",
  authDomain: "e-commerce-a2252.firebaseapp.com",
  projectId: "e-commerce-a2252",
  storageBucket: "e-commerce-a2252.appspot.com",
  messagingSenderId: "461502812973",
  appId: "1:461502812973:web:e8a3c4b66888e00b05b9a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
