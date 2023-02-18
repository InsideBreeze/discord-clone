import { initializeApp } from "firebase/app";
import {  getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "discord-clone-33f7c.firebaseapp.com",
    projectId: "discord-clone-33f7c",
    storageBucket: "discord-clone-33f7c.appspot.com",
    messagingSenderId: "123108198005",
    appId: "1:123108198005:web:52a4cf5064580edf8c5a3c"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
    app,
    db,
    auth,
    provider
}