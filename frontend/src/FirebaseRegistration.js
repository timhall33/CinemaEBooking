import { auth } from "./Firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from './Firebase';
import {User, userConverter} from './UserModel';

function register(firstName, lastName, email, phoneNumber, password) {
    const db = getFirestore(app);

        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            if (result) {
                
                console.log("User created successfully")
                
                storeUser("Matthew","Gayle","matthewgayle50@gmail.com","4049064251",result.user.uid) 
            } else {
                console.log("Registration not complete")
            }
          })
        .catch(err => console.log(err.message))



  }

    function storeUser(firstName, lastName, email, phoneNumber, currentuid) {
    const db = getFirestore(app);
    // adding document
    const ref = doc(db, "Users", currentuid).withConverter(userConverter);
    setDoc(ref, new User(firstName, lastName, email, phoneNumber, true, true));
  } 
  
  export default register;