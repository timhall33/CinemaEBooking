import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { fabClasses } from "@mui/material";
import {  connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9KxUuTkeZTh_AKpr2C2aLM4hgKNhMRp4",
  authDomain: "cinemabooking-6ab9b.firebaseapp.com",
  projectId: "cinemabooking-6ab9b",
  storageBucket: "cinemabooking-6ab9b.appspot.com",
  messagingSenderId: "693638169105",
  appId: "1:693638169105:web:580089a49d489c1b2027b0"
};

// Initialize Firebase
export const app  = initializeApp(firebaseConfig);

initializeFirestore(app, {
  ignoreUndefinedProperties: true
});



const db = getFirestore(app);

export default db;


