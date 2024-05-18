const mongoose = require('mongoose');


const MovieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    popularity: {
        type: Number,
        required: true
    },
    voteAverage: {
        type: Number,
        required: true
    },
    voteCount: {
        type: Number,
        required: true
    },
    genres: [{ type:String, required:true}],
    posterURL: {
        type: String,
        required: true
    },
    backdropURL: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);
MovieSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "movie",
    justOne: false,
})

// Create the Movie model from the schema
const Movie = mongoose.model('Movie', MovieSchema);

// Export the Movie model
module.exports = Movie;