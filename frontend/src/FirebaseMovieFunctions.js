
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {app} from './Firebase';
import {db} from './Firebase';
import {Movie, movieConverter} from './MovieModel';
import { addDoc ,deleteDoc} from 'firebase/firestore';
import { collection } from "firebase/firestore";


export async function storeMovie(movieTitle, movieCategory, movieCast, movieProducer, movieSynopsis, movieTrailer, movieRatingCode, movieShowDate, movieShowTime) {

    // adding document
    const ref = collection(db, "movies").withConverter(movieConverter)
    console.log("a")
    await addDoc(ref, new Movie(movieTitle, movieCategory, movieCast, movieProducer, movieSynopsis, movieTrailer, movieRatingCode, movieShowDate, movieShowTime))
    .then((e) => {{
        console.log(e)
    }})
    .catch((error) => {
        console.log(error)
    })

  }



  
 