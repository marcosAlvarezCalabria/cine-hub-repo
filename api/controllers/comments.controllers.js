const Comment = require("../models/comment.model");
const mongoose = require("mongoose");
const Movie = require("../models/movie.model");



module.exports.create = (req, res, next) => {

    Movie.findById(req.params.id)
        .then((movie) => {
            if (movie) {
                Comment.create({ ...req.body, movie: req.params.id ,author: req.user.id })
                    .then((comment) => {
                        res.json(comment)
                    })
                    .catch((error) => {
                        if (error instanceof mongoose.Error.ValidationError) {
                            res.status(400).json(error.errors)
                        } else {
                            next(error)
                        }
                    });
            } else {
                res.status(404).json({ message: "Movie not found" });
            }
        })
        .catch((error) => next(error));

}


module.exports.update = (req, res, next) => {

    Comment.findByIdAndUpdate(req.params.id, req.body, {

        runValidators: true,
        new: true

    })
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            if(err instanceof mongoose.ValidationError){
                res.status(400).json(err.errors)
            } else {
                next(err)
            }
        })

}
module.exports.delete = (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id)
        .then((comment) => {
            if(comment){
                res.status(204).send()
            } else {
                res.status(404).json({message: "Comment nopt found"})
            }
        })
        .catch()
}