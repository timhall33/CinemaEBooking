
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {app} from './Firebase';
import {db} from './Firebase';
import {Promotion, promoConverter} from './PromotionModel';
import { addDoc ,deleteDoc , getDocs, query, where, updateDoc} from 'firebase/firestore';
import { collection } from "firebase/firestore";
import {userConverter} from './UserModel'
import emailjs, { send } from "@emailjs/browser"


export async function storePromo(title, description, discount) {

    // adding document
    const ref = collection(db, "promotions").withConverter(promoConverter)

    await addDoc(ref, new Promotion(title, description, discount))
    .then((e) => {{

        console.log(e)
        const newRef = doc(db, "promotions", e.id);
        updateDoc(newRef, {
            promotionID: e.id
        })
        console.log(e)
        window.location.reload(false)
        sendPromotionEmails(discount,description)
    }})
    .catch((error) => {
        console.log(error)
    })
    window.location.reload(false)

  }

  async function sendPromotionEmails(promotionAmount, promotionDescription) {

    const q = query(collection(db, "users") , where("promotionStatus" , "==", true));
    const querySnapshot = await getDocs(q);  
    querySnapshot.forEach((doc) => {
    const user = doc.data()
    var params = {
        name: user.firstName,
        email: user.email,
        promotionAmount: promotionAmount,
        promotionDescription: promotionDescription
    };
    emailjs.send("service_1s3tmck","template_1oybops",params)
    .then((e) => {{

    }})
    .catch((error) => {
        console.log(error)
    })

    });
  
  }