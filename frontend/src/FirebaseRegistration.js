
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {app} from './Firebase';
import db from './Firebase';
import {User, userConverter} from './UserModel';
import { getAuth, onAuthStateChanged } from "firebase/auth";




 function register(firstName, lastName, email, phoneNumber, password, promotionStatus, userStatus, props) {


        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            if (result) {
                
                console.log("User created successfully")
                sendVerification(auth)
         // Check for user status
          storeUser(db, firstName,lastName,email,phoneNumber,result.user.uid, promotionStatus, userStatus) 

            } else {
                console.log("Registration not complete")
            }
           

          })
        .catch(err => {
          props.setResponse(err.message)
        })
     

       
  }

   async function storeUser(db, firstName, lastName, email, phoneNumber, currentuid, promotionStatus, userStatus) {

    // adding document
    const ref = doc(db, "users", currentuid).withConverter(userConverter)

    await setDoc(ref, new User(firstName, lastName, email, phoneNumber, true, true, currentuid))

  }
  
  function sendVerification(auth) {
    sendEmailVerification(auth.currentUser)
  }

  
  export default register;