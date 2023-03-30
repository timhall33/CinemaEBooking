
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {app} from './Firebase';
import {db} from './Firebase';
import {Promotion, promoConverter} from './PromotionModel';
import { addDoc ,deleteDoc} from 'firebase/firestore';
import { collection } from "firebase/firestore";


export async function storePromo(title, description, discount) {

    // adding document
    const ref = collection(db, "promotions").withConverter(promoConverter)

    await addDoc(ref, new Promotion(title, description, discount))
    .then((e) => {{
        console.log(e)
    }})
    .catch((error) => {
        console.log(error)
    })

  }