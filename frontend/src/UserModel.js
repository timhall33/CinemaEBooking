

export class User {
     
    constructor (firstName, lastName, email, phoneNumber, promotionStatus, userStatus,uid) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
        this.promotionStatus = promotionStatus
        this.userStatus = userStatus
        this.uid = uid
    
    }
}

// Firestore data converter
export const userConverter = {
    toFirestore: function (user) {
       
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            promotionStatus: user.promotionStatus,
            userStatus: user.userStatus,
            uid: user.uid
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new User(data.firstName, data.lastName, data.email, data.phoneNumber, data.promotionStatus, data.userStatus, data.uid);
    }

}; 