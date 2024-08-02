// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8KMwg8pzx9ixKuhjtVBLhi4lQMAsMMcI",
  authDomain: "college-application-ef4f2.firebaseapp.com",
  projectId: "college-application-ef4f2",
  storageBucket: "college-application-ef4f2.appspot.com",
  messagingSenderId: "337652403612",
  appId: "1:337652403612:web:131630b554f94ac0ebcc59",
  measurementId: "G-1CFDYCHC2Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// Optionally, initialize Analytics if needed
// const analytics = getAnalytics(app);
