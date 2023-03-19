import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {app} from './Firebase'


export default function Login(email, password, navigate) {
    const auth = getAuth(app)


    signInWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
        const user = userCred.user;
        navigate("/")
        console.log(user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });

    function forgotPassword(email) {
        const auth = getAuth(app);
        const user = auth.currentUser
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Email sent
          }).catch((error) => {
            
          });


    }

}
