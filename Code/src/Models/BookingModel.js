export class Booking {
     
    constructor (movie, showTime, ticket,price, seat, address, payment, userId, bookingId) {
        this.movie = movie
        this.showTime = showTime
        this.ticket = ticket
        this.seat = seat
        this.address = address
        this.payment = payment
        this.userId = userId
        this.price = price;
        this.bookingId = bookingId;
    }   
    
}
// Firestore data converter
export const bookingConverter = {
    toFirestore: function (booking) {
       
       
        return {
            movie: booking.movie,
            showTime: booking.showTime,
            ticket:  booking.ticket,
            seat: booking.seat,
            address: booking.address,
            payment: booking.payment,
            price: booking.price,
            userId: booking.userId
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Booking(data.movie, data.showTime, data.ticket, data.price, data.seat, data.address, data.payment, data.userId, data.bookingId)
    }

}; 