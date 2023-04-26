
import {db} from './Firebase';
import { bookingConverter } from '../Models/BookingModel';
import { doc, setDoc, updateDoc, addDoc } from "firebase/firestore";
import { Booking } from '../Models/BookingModel';
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { auth } from '../Controls/Firebase';
import {userConverter} from '../Models/UserModel';
import  emailjs, { sendForm } from "@emailjs/browser"

export async function storeBooking(movie, showTime, ticket,price, seat, address, payment, userId) {

    // adding document
    const ref = collection(db, "booking").withConverter(bookingConverter)

    await addDoc(ref, new Booking(movie, showTime, ticket, price, seat, address, payment, userId))
    .then(async (e) => {{

      console.log(e)
      const newRef = doc(db, "booking", e.id);
      updateDoc(newRef, {
          bookingID: e.id

      })
      const ref = doc(db, "users", auth.currentUser.uid).withConverter(userConverter)
      const docSnap = await getDoc(ref)
      if (docSnap.exists()) {
          const user = docSnap.data();
          const name = user.firstName
          const email = user.email
          console.log(movie)
          sendBookingConfirmation(name, email, movie, showTime.date, showTime.time, price);
        }

     
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

 async function sendBookingConfirmation(toName, email, movieTitle, date, time, orderTotal) {
  const emailParams = {
            email: email,
            toName: toName,
            movieTitle: movieTitle,
            date: date,
            time: time,
            orderTotal: orderTotal

        }
        emailjs.send('service_zonv1b2', 'template_yn45lwh', emailParams,'Wu_JsPCsb84O3Td2K')
        .then(response => {
          console.log('Email sent successfully', response);
        })
        .catch(error => {
          console.error('Failed to send email', error);
        });

  }