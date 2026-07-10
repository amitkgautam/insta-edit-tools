// Import specific Firebase modules directly using CDN tracking URL endpoints
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🧩 PASTE YOUR FIREBASE WEB APP CONFIGURATION OBJECT BLOCKS HERE
const firebaseConfig = {
    apiKey: "AIzaSyCaQSOmCJK5Wr44ZWpWTIx9sEheqPDrU0Y",
    authDomain: "insta-web-portal.firebaseapp.com",
    projectId: "insta-web-portal",
    storageBucket: "insta-web-portal.firebasestorage.app",
    messagingSenderId: "1006909329862",
    appId: "1:1006909329862:web:9a6c30ca1f2125b12862c7"
};

// Initialize Instance Connections
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, signInWithPopup, signOut, doc, setDoc, collection, getDocs, serverTimestamp };
