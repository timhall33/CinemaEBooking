import { auth } from "./Firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'


function register(email, password) {
    
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