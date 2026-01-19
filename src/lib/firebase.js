import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5PQxGVnpagMVJTUisNV7PnewQxGTTHJ8",
  authDomain: "portfolio-4f7e2.firebaseapp.com",
  projectId: "portfolio-4f7e2",
  storageBucket: "portfolio-4f7e2.firebasestorage.app",
  messagingSenderId: "770159478435",
  appId: "1:770159478435:web:fee7f76181888dc3c36116",
  measurementId: "G-RYWGVPLHYX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
