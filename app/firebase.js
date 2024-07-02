import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANMD6cxO9iNeTYmXdlQY_R1YZnGPQS7GI",
  authDomain: "team-original-app-b98ae.firebaseapp.com",
  projectId: "team-original-app-b98ae",
  storageBucket: "team-original-app-b98ae.appspot.com",
  messagingSenderId: "358538070638",
  appId: "1:358538070638:web:cf42ae5d42ad1df826747f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
