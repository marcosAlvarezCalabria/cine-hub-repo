const Comment = require("../models/comment.model");
const { getMovieById, listMoviesByGenre } = require("../services/tmdb.service");

module.exports.detail = async (req, res, next) => {
  try {
    const movie = await getMovieById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const comments = await Comment.find({ movie: movie.id }).populate("author");

    return res.json({
      ...movie,
      comments,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports.list = async (req, res, next) => {
  try {
    const { genres } = req.query;
    const movies = await listMoviesByGenre(genres);
    return res.json(movies);
  } catch (error) {
    return next(error);
  }
};
