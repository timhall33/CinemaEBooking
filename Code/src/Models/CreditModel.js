import { encryptWithAES } from "../Encrypt";

export class CreditCard {
     
    constructor (cardType, cardNumber, cardExp, addyOne,  city, state, zipCode, country, userId) {
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.cardExp = cardExp;
        this.addyOne = addyOne;

        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
        this.userId = userId;
    }   
    
}
// Firestore data converter
export const cardConverter = {
    toFirestore: function (card) {

       
        return {
            cardType: card.cardType,
            cardNumber: encryptWithAES(card.cardNumber),
            cardExp: encryptWithAES(card.cardExp),
            addyOne: encryptWithAES(card.addyOne),

            city: card.city,
            state: card.state,
            zipCode: encryptWithAES(card.zipCode),
            country: card.country,
            userId: card.userId,
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new CreditCard(data.cardType, encryptWithAES(data.cardNumber), encryptWithAES(data.cardExp), encryptWithAES(data.addyOne),  data.city, data.state, encryptWithAES(data.zipCode), 
            data.country, data.userId)
    }

}; 
