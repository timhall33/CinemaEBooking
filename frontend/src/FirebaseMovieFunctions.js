
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {app} from './Firebase';
import {db} from './Firebase';
import {Movie, movieConverter} from './MovieModel';
import { addDoc ,deleteDoc} from 'firebase/firestore';
import { collection } from "firebase/firestore";


export async function storeMovie(movieTitle, movieCategory, movieCast, movieDirector, movieProducer, movieSynopsis, movieTrailer, movieRatingCode, movieShowDate, movieShowTime) {

    // adding document
    const ref = collection(db, "movies").withConverter(movieConverter)
    await addDoc(ref, new Movie(movieTitle, movieCategory, movieCast, movieDirector, movieProducer, movieSynopsis, movieTrailer, movieRatingCode, movieShowDate, movieShowTime, ""))
    .then((e) => {{
        console.log(e)
        const newRef = doc(db, "movies", e.id);
        updateDoc(newRef, {
            movieID: e.id
        })
        window.location.reload(false)
    }})
    .catch((error) => {
        console.log(error)
    })

  }



  
 