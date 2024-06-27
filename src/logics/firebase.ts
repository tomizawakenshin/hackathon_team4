import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyD_zkx7amrhfW7c33eXTknsf9tl_oEi3VI",
    authDomain: "craft-studium.firebaseapp.com",
    projectId: "craft-studium",
    storageBucket: "craft-studium.appspot.com",
    messagingSenderId: "820241091711",
    appId: "1:820241091711:web:a072f16f46bdeeaf82c34a",
    measurementId: "G-3XEFL1YZ00"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };