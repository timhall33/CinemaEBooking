import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fabClasses } from "@mui/material";
import {  connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore';
import { useEffect, useState } from "react";
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

export const withAuth = (Component) => {
  const WithAuth = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
      return unsubscribe;
    }, []);

    // Pass the user object or authentication status down to the child component
    return <Component {...props} user={user} isAuthenticated={user !== null} />;
  };

  return WithAuth;
};
// Initialize Firebase
export const app  = initializeApp(firebaseConfig);

initializeFirestore(app, {
  ignoreUndefinedProperties: true
});

export const db = getFirestore(app);
export const auth = getAuth(app);






