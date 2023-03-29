import { encryptWithAES, decryptWithAES} from "./Encrypt"

export class CreditCard {
     
    constructor (cardType, cardNumber, cardExp, addyOne, addyTwo, city, state, zipCode, country, userId) {
        this.cardType = cardType;
        this.cardNumber = cardNumber;
        this.cardExp = cardExp;
        this.addyOne = addyOne;
        this.addyTwo = addyTwo;
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
            cardType: encryptWithAES(card.cardType),
            cardNumber: encryptWithAES(card.cardNumber),
            cardExp: encryptWithAES(card.cardExp),
            addyOne: encryptWithAES(card.addyOne),
            addyTwo: encryptWithAES(card.addyTwo),
            city: card.city,
            state: card.state,
            zipCode: encryptWithAES(card.zipCode),
            country: card.country,
            userId: card.userId,
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new CreditCard(decryptWithAES(data.cardType), decryptWithAES(data.cardNumber), decryptWithAES(data.cardExp), decryptWithAES(data.addyOne), decryptWithAES(data.addyTwo), data.city, data.state, decryptWithAES(data.zipCode), 
            data.country, data.userId)
    }

}; 
