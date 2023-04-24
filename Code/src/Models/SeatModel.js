

export class Seat {
     
    constructor (row, col, userId, seatId) {
        this.row = row
        this.col = col
        this.userId = userId
        this.seatId = seatId
    }   
    
}
// Firestore data converter
export const seatConverter = {
    toFirestore: function (seat) {
       
       
        return {
            row: seat.row,
            col: seat.col,
            userId: userId,
            seatId: seatId
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Seat(data.row, data.col, data.userId, data.seatId)
    }

}; 