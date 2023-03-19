import { getAuth } from "firebase/auth";
import {db } from './Firebase';
import { doc, updateDoc } from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { updatePassword } from 'firebase/auth';
async function updateProfile (firstName, lastName, phoneNumber, promotionStatus, navigate, props){
    const auth = getAuth();
    const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const docRef = doc(db, 'users/', uid);

          const data = { 
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            promotionStatus: promotionStatus,
          };

          
      
          console.log("made it here");
          await updateDoc(docRef, data)
            .then((res) => {
              console.log('Document updated successfully!');
            
            })
            .catch((error) => {
              console.error('Error updating document: ', error);
            });

            
            if (props.changePass) {
              const cred = EmailAuthProvider.credential(user.email, props.password);
              
              try {
                await reauthenticateWithCredential(user, cred)
               
                // User entered correct credentials
                // Update password
                props.setError(false)
                await updatePassword(user,  props.newPassword);
              } catch (e) {
                console.log(e.code, e.message)
                // Could be incorrect credentials
                props.setError(true)
                props.setErrorMess(e.message)
              }
            
            }


        } else {
          console.log('No user signed in.');
        }
}

export default updateProfile;