export class Booking {
     
    constructor (showTime, ticket, seat, address, payment, userId) {
        this.showTime = showTime
        this.ticket = ticket
        this.seat = seat
        this.address = address
        this.payment = payment
        this.userId = userId
    }   
    
}
// Firestore data converter
export const bookingConverter = {
    toFirestore: function (booking) {
       
       
        return {
            showTime: booking.showTime,
            ticket:  booking.ticket,
            seat: booking.seat,
            address: booking.address,
            payment: booking.payment,
            userId: booking.userId
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Booking(data.showTime, data.ticket, data.seat, data.address, data.payment, data.userId)
    }

}; 