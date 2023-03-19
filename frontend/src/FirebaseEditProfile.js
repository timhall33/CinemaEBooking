import { getAuth } from "firebase/auth";
import db from './Firebase';
import { doc, updateDoc } from "firebase/firestore";

function updateProfile (firstName, lastName, navigate){
    const auth = getAuth();
    const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const docRef = doc(db, 'users/' + uid);
          const data = { firstName: {firstName}, lastName: {lastName} };
          console.log("made it here");
          updateDoc(docRef, data)
            .then(() => {
              console.log('Document updated successfully!');
              navigate("/")
            })
            .catch((error) => {
              console.error('Error updating document: ', error);
            });
        } else {
          console.log('No user signed in.');
        }
}

export default updateProfile;