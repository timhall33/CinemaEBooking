
import {db} from './Firebase';
import { bookingConverter } from '../Models/BookingModel';
import { doc, setDoc, updateDoc, addDoc } from "firebase/firestore";
import { Booking } from '../Models/BookingModel';
import { collection, query, where, getDocs } from "firebase/firestore";

export async function storeBooking(movie, showTime, ticket,price, seat, address, payment, userId) {

    // adding document
    const ref = collection(db, "booking").withConverter(bookingConverter)

    await addDoc(ref, new Booking(movie, showTime, ticket,price, seat, address, payment, userId))
    .then((e) => {{

      console.log(e)
      const newRef = doc(db, "booking", e.id);
      updateDoc(newRef, {
          bookingID: e.id

      })
 
     
  }})
  .catch((error) => {
      console.log(error)
  })
    
    const data = {
        userId: userId
    }


    seat.forEach(async item => {
      const seatRef = doc(db, 'seats/', item.seatId);

    await updateDoc(seatRef, data)
            .then((res) => {
              console.log('Document updated successfully!');
            
            })
            .catch((error) => {
              console.error('Error updating document: ', error);
            });
    });
    
  }