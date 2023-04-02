

export class Promotion {
     
    constructor (title, description, discount) {
        this.title = title
        this.description = description
        this.discount = discount

        
    }
    
}
// Firestore data converter
export const promoConverter = {
    toFirestore: function (promo) {
       
       
        return {
            title : promo.title,
            description: promo.description,
            discount: promo.discount

            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Promotion(data.title, data.description, data.discount)
    }

}; 