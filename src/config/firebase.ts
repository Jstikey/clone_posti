import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7C8egCujFXK443EXBqr0FVrQoh3LARDY",
  authDomain: "awesomepost-425ee.firebaseapp.com",
  projectId: "awesomepost-425ee",
  storageBucket: "awesomepost-425ee.appspot.com",
  messagingSenderId: "512678737852",
  appId: "1:512678737852:web:e25eb58f72885cc5fa5db9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const imageDb = getStorage(app);
