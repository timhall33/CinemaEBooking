

export class Movie {
     
    constructor (movieTitle, movieCategory, movieCast, movieDirector, movieProducer, movieSynopsis, movieTrailer, movieRatingCode, movieShowDate, movieShowTime, movieID) {
        this.movieTitle = movieTitle
        this.movieCategory = movieCategory
        this.movieDirector = movieDirector
        this.movieCast = movieCast
        this.movieProducer = movieProducer
        this.movieSynopsis = movieSynopsis
        this.movieTrailer = movieTrailer
        this.movieRatingCode = movieRatingCode
        this.movieShowDate = movieShowDate
        this.movieShowTime = movieShowTime
        this.movieID = movieID
    } 
    
}
// Firestore data converter
export const movieConverter = {
    toFirestore: function (movie) {
       
       
        return {
            movieTitle: movie.movieTitle,
            movieCategory: movie.movieCategory,
            movieCast: movie.movieCast,
            movieDirector: movie.movieDirector,
            movieProducer: movie.movieProducer,
            movieSynopsis: movie.movieSynopsis,
            movieTrailer: movie.movieTrailer,
            movieRatingCode: movie.movieRatingCode,
            movieShowDate: movie.movieShowDate,
            movieShowTime: movie.movieShowTime,
            movieID: movie.movieID
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Movie(data.movieTitle, data.movieCategory, data.movieCast, data.movieDirector, data.movieProducer, data.movieSynopsis, data.movieTrailer, data.movieRatingCode, data.movieShowDate, data.movieShowTime, data.movieID)
    }

}; 