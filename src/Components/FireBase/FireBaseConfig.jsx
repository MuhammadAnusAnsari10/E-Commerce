import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA1-TmDbT-ZVQOgH-5Nfu8I7dGws1eiyKE",
  authDomain: "e-commerce-project-88fd6.firebaseapp.com",
  projectId: "e-commerce-project-88fd6",
  storageBucket: "e-commerce-project-88fd6.appspot.com",
  messagingSenderId: "871098200074",
  appId: "1:871098200074:web:4a760c2e8aa0d8a6896ff3",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
