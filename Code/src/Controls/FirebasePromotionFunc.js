
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {app} from './Firebase';
import {db} from './Firebase';
import {Promotion, promoConverter} from '../Models/PromotionModel';
import { addDoc ,deleteDoc , getDocs, query, where, updateDoc} from 'firebase/firestore';
import { collection } from "firebase/firestore";
import {userConverter} from '../Models/UserModel'
import  emailjs, { sendForm } from "@emailjs/browser"
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
    });


    // UNcomment this for the demo ...

    emailList.forEach((email) => {
        const emailParams = {
            email: email,
            promotionAmount: promotionAmount,
            promotionDescription: promotionDescription

        }
        emailjs.send('service_zonv1b2', 'template_1tdqq1l', emailParams,'Wu_JsPCsb84O3Td2K')
        .then(response => {
          console.log('Email sent successfully', response);
        })
        .catch(error => {
          console.error('Failed to send email', error);
        });
    });


    
    
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }