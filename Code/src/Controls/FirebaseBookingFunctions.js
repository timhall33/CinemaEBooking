
import {db} from './Firebase';
import { bookingConverter } from '../Models/BookingModel';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Booking } from '../Models/BookingModel';
import { collection, query, where, getDocs } from "firebase/firestore";

export async function storeBooking(movie, showTime, ticket,price, seat, address, payment, userId) {

    // adding document
    const ref = doc(db, "booking", userId).withConverter(bookingConverter)

    await setDoc(ref, new Booking(movie, showTime, ticket,price, seat, address, payment, userId))
    
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