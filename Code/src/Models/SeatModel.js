

export class Seat {
     
    constructor (row, col, userId) {
        this.row = row
        this.col = col
        this.userId = userId
    }   
    
}
// Firestore data converter
export const seatConverter = {
    toFirestore: function (seat) {
       
       
        return {
            row: seat.row,
            col: seat.col,
            userId: userId
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Seat(data.row, data.col, col.userId)
    }

}; 