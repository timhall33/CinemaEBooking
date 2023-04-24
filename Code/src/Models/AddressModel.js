import Add from "@mui/icons-material/Add";

export class Address {
     
    constructor (street, city, state, zipCode, userId) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode
        this.userId = userId
    }   
    
}
// Firestore data converter
export const addressConverter = {
    toFirestore: function (address) {
       
       
        return {
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            userId: address.userId,
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Address(data.street, data.city, data.state, data.zipCode, data.userId)
    }

}; 
