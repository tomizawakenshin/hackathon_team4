import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA3cMSXRfqgbKjCs5tZevjoASZ3svLjTsc",
    authDomain: "craftstudium-team4.firebaseapp.com",
    projectId: "craftstudium-team4",
    storageBucket: "craftstudium-team4.appspot.com",
    messagingSenderId: "224892382781",
    appId: "1:224892382781:web:8dabe3b0c31f428fffc454"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };