import { getAuth } from "firebase/auth";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import app from './Firebase'
import email from './RegisterView'
import password from './RegisterView'

function register(email, password) {

    const auth = getAuth(app);
    console.log(email);
   // if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log(res.user)
          })
        .catch(err => console.log(err.message))
    //}
  }
  export default register;
  // ...