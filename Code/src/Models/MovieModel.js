

export class Movie {
     
    constructor (movieTitle, movieCategory, movieCast, movieDirector, movieProducer, movieSynopsis, movieTrailer, movieRatingCode, times, movieID, movieStarRating) {
        this.movieTitle = movieTitle
        this.movieCategory = movieCategory
        this.movieDirector = movieDirector
        this.movieCast = movieCast
        this.movieProducer = movieProducer
        this.movieSynopsis = movieSynopsis
        this.movieTrailer = movieTrailer
        this.movieRatingCode = movieRatingCode
        this.times = times
        this.movieID = movieID
        this.movieStarRating = movieStarRating
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
            times: movie.times,
            movieID: movie.movieID,
            movieStarRating: movie.movieStarRating
            };
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Movie(data.movieTitle, data.movieCategory, data.movieCast, data.movieDirector, data.movieProducer, data.movieSynopsis, data.movieTrailer, data.movieRatingCode, data.times, data.movieID, data.movieStarRating)
    }

}; 