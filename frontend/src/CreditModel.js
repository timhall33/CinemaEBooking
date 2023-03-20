

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
            cardType: card.cardType,
            cardNumber: card.cardNumber,
            cardExp: card.cardExp,
            addyOne: card.addyOne,
            addyTwo: card.addyTwo,
            city: card.city,
            state: card.state,
            zipCode: card.zipCode,
            country: card.country,
            userId: card.userId,
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new CreditCard(data.cardType, data.cardNumber, data.cardExp, data.addyOne, data.addyTwo, data.city, data.state, data.zipCode, 
            data.country, data.userId)
    }

}; 
