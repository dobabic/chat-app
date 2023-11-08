import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCYKz3JYSvHu4OxzbN4Dqmk7YGtI3gNMzg",
    authDomain: "fir-msg-app-65e3e.firebaseapp.com",
    projectId: "fir-msg-app-65e3e",
    storageBucket: "fir-msg-app-65e3e.appspot.com",
    messagingSenderId: "107860842188",
    appId: "1:107860842188:web:bcca8093244ac7dd441469"
};
  
// Init Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
