import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {app, auth} from './Firebase'
import { setPersistence,  browserSessionPersistence } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc  } from "firebase/firestore";
import { db} from './Firebase'

async function checkUserState(userId) {
    const q = query(collection(db, "users"), where("userId", "==", userId));
  
  
  
  

    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      
     console.log(doc)
    });
  
  
  
    
    
  }

export function login(email, password, navigate, props) {
    
    // if (props.rememberMe) {
    //     setPersistence(auth, browserSessionPersistence)

    // }

  

    signInWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
        const user = userCred.user;


            if (user  && auth.currentUser.emailVerified === true ) {
                navigate("/")
            } 

            props.setUserAuth(auth.currentUser.emailVerified)
        
       
       

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        props.setResponse(error.message)
    });


}

export function forgotPassword(auth, email) {
    const user = auth.currentUser
    sendPasswordResetEmail(auth, email)
    .then(() => {
        // Email sent
      }).catch((error) => {
        
      });


}