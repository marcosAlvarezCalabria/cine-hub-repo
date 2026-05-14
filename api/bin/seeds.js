require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("../models/movie.model");
const moviesData = require("../data/movies.json");
const genres = require("../data/genres.json");

require("../configs/db.config");

mongoose.connection.once("open", () => {
  console.log(`Successfully connected to the data base ${mongoose.connection.db.database}`);

  Movie.deleteMany({})
    .then(() => {
      console.info("Dropped movies collection");

      const normalizedMovies = moviesData.map((movie) => {
        const normalizedGenres = (movie.genreIds || []).map((genreId) => genres[genreId.toString()]).filter(Boolean);

        return {
          ...movie,
          genres: normalizedGenres,
        };
      });

      return Movie.create(normalizedMovies);
    })
    .then((createdMovies) => console.info(`${createdMovies.length} movies created`))
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    })
    .finally(() => process.exit());
});
