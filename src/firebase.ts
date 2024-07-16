// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoNunQJy_c-cgpq99lbpDoVF3lJLT9N_I",
  authDomain: "udemy-household-app-72591.firebaseapp.com",
  projectId: "udemy-household-app-72591",
  storageBucket: "udemy-household-app-72591.appspot.com",
  messagingSenderId: "948251103301",
  appId: "1:948251103301:web:94a68e30aec3ff4924932c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };