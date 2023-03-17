import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



// reading from db
// db name: Test
// id: zXH4gWe1546CRXwV9DvQ
// field name: item

// async function reading(db) {


//     const testCollection = collection(db, 'Test')
//     const snapshot = await getDocs(testCollection)
//     const list = snapshot.docs.map(doc => doc.data())

//     return list;

// }


// function Button() {
//     return (
//         <div>
            
//             <button onClick={() => console.log(reading(db))}>
//                 CLICK ME!!!!
//             </button>
//         </div>
//     )
// }


export const auth = getAuth(app);
export default app;


