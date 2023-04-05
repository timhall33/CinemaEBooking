
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {app} from './Firebase';
import {db} from './Firebase';
import {Promotion, promoConverter} from './PromotionModel';
import { addDoc ,deleteDoc , getDocs, query, where, updateDoc} from 'firebase/firestore';
import { collection } from "firebase/firestore";
import {userConverter} from './UserModel'
import emailjs, { sendForm } from "@emailjs/browser"
import React from "react";

export async function storePromo(title, description, discount,formRef) {

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
        sendPromotionEmails(discount,description,formRef)
    }})
    .catch((error) => {
        console.log(error)
    })
   

  }

   async function sendPromotionEmails(promotionAmount, promotionDescription, formRef) {
    var emailList = []
    const q = query(collection(db, "users") , where("promotionStatus" , "==", true));
    const querySnapshot = await getDocs(q);  
    querySnapshot.forEach((doc) => {
    const user = doc.data()
    emailList.push(user.email)
    console.log(user.email)
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
    


    emailjs.sendForm("service_zonv1b2","template_1tdqq1l",formRef,"Wu_JsPCsb84O3Td2K")
    .then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
        
    })
    
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }