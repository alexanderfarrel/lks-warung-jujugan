// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgXqheP11MEicdMSYfnXFC0ODzLDRz_7k",
  authDomain: "lks-warung.firebaseapp.com",
  projectId: "lks-warung",
  storageBucket: "lks-warung.firebasestorage.app",
  messagingSenderId: "226810224169",
  appId: "1:226810224169:web:231d00fe65a331c0c10638",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const db = getFirestore();
