import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyANI2Vwijw1m3wpedRqhJt-hvG58TSbPoo",
  authDomain: "hackathon-team4-preposted.firebaseapp.com",
  projectId: "hackathon-team4-preposted",
  storageBucket: "hackathon-team4-preposted.appspot.com",
  messagingSenderId: "681450643673",
  appId: "1:681450643673:web:8f304df0d2e6f02ee2dec8"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
