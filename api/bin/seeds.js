require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("../models/movie.model");
const moviesData = require("../data/movies.json");
const genres = require('../data/genres.json')

require("../configs/db.config");


mongoose.connection.once("open", () => {
    console.log(`Successfully connected to the data base ${mongoose.connection.db.database}`)
    mongoose.connection.dropCollection("movies")
        .then( () => {
            console.info("Dropped restaurants collection ");
        
            moviesData.forEach(m => {
                m.genres = m.genreIds.map(g => genres[g.toString()])
                delete m.genreIds
            })

            return Movie.create(moviesData);
        })
        .then((restaurants) => console.info(`${movies.length} movies created`))
        .catch((error) => error(error))
        .finally(() => process.exit(0))

})