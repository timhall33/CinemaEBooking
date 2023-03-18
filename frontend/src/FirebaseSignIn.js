import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {app} from './Firebase'


export default function login(email, password, navigate, props) {
    const auth = getAuth(app)
    

  
    

    signInWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
        const user = userCred.user;
        if (userCred && auth.currentUser.emailVerified === true ) {
            navigate("/")
        } 
      
        console.log(user)
        
        props.setUserAuth(auth.currentUser.emailVerified)


    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });


}

function forgotPassword(email) {
    const auth = getAuth(app);
    const user = auth.currentUser
    sendPasswordResetEmail(auth, auth.currentUser.email)
    .then(() => {
        // Email sent
      }).catch((error) => {
        
      });


}