
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {app} from './Firebase';
import {db} from './Firebase';
import {Promotion, promoConverter} from './PromotionModel';
import { addDoc ,deleteDoc , getDocs, query, where} from 'firebase/firestore';
import { collection } from "firebase/firestore";
import {userConverter} from './UserModel'
import emailjs, { sendForm } from "@emailjs/browser"


export async function storePromo(title, description, discount) {

    // adding document
    const ref = collection(db, "promotions").withConverter(promoConverter)

    await addDoc(ref, new Promotion(title, description, discount))
    .then((e) => {{
        console.log(e)
        sendPromotionEmails(discount,description)
    }})
    .catch((error) => {
        console.log(error)
    })
  }

   async function sendPromotionEmails(promotionAmount, promotionDescription) {
    var emailList = []
    const q = query(collection(db, "users") , where("promotionStatus" , "==", true));
    const querySnapshot = await getDocs(q);  
    querySnapshot.forEach((doc) => {
    const user = doc.data()
    emailList.push(user.email)
    // var params = {
    //     name: user.firstName,
    //     email: user.email,
    //     promotionAmount: promotionAmount,
    //     promotionDescription: promotionDescription
    // };
    //emailjs.sendForm("service_1s3tmck","template_1oybops",params,"EJ1BDajCipvNpTd2_")
    });

    emailList.forEach(async (email) => {
        var params = {
        email: email,
        promotionAmount: promotionAmount,
        promotionDescription: promotionDescription
    };
        emailjs.sendForm("service_1s3tmck","template_1oybops",params,"EJ1BDajCipvNpTd2_")
        await sleep(2000)
    })
    
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }