// src/firebase/init.js

// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpsWbsh2MOdbAR_DjXa7KGSouBI6tbw",
  authDomain: "week7-ada.firebaseapp.com",
  projectId: "week7-ada",
  storageBucket: "week7-ada.firebasestorage.app",
  messagingSenderId: "229695587988",
  appId: "1:229695587988:web:427221a5521c52cf101681"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Export so other files can use them
export { db, auth };
