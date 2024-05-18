const mongoose = require("mongoose");
const Movie = require("../models/movie.model");



module.exports.detail = (req, res, next) => {
    const movieId = req.params.id
    Movie.findById(movieId)
        .populate({
            path: "comments",
            populate: {
                path: "author",
                model: "User"
            }
        })
        
        .then((movie) => {
            if (movie) {
                res.json(movie)
            } else {
                res.status(404).json({message : "Movie not found"})
            }
        })
        .catch((error) => next(error))

}

module.exports.list = (req, res, next) => {
    const { genres } = req.query;
    const criterial = {}
    if (genres) criterial.genres = genres



  
    Movie.find(criterial)
        .then((movies) => res.json(movies))
        .catch(next)
}