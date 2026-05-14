const Comment = require("../models/comment.model");
const mongoose = require("mongoose");
const { getMovieById } = require("../services/tmdb.service");

function isCommentOwner(comment, userId) {
  return comment.author?.toString() === userId.toString();
}

module.exports.create = async (req, res, next) => {
  try {
    const movieId = Number.parseInt(req.params.id, 10);
    const movie = await getMovieById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const comment = await Comment.create({ ...req.body, movie: movieId, author: req.user.id });
    return res.status(201).json(comment);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json(error.errors);
    }

    return next(error);
  }
};

module.exports.update = (req, res, next) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (!isCommentOwner(comment, req.user.id)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      return Comment.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
      }).then((updatedComment) => res.json(updatedComment));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json(err.errors);
      }

      return next(err);
    });
};

module.exports.delete = (req, res, next) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (!isCommentOwner(comment, req.user.id)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      return Comment.findByIdAndDelete(req.params.id).then(() => res.status(204).send());
    })
    .catch((error) => next(error));
};
