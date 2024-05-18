const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const genreJson = require("../data/genres.json")


const genres = Object.values(genreJson);

const schema = new Schema(
    {
        name: {
            type: String,
            required: "Name is required"
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
          },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [6, "password needs at least 6 characters"],
          },
        birthDate: {
            type: Date,
            required: true,
        },
        genre: {
            type: String,
            enum: genres,
            required: true
        },
        favorites: [{ 
            type: Schema.Types.ObjectId,
             ref: 'Movie' }] ,
        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true
            },
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.password;
                return ret;
            },
        },
    }
);

schema.pre("save", function(next) {
    if(this.isModified("password")){
        bcrypt.hash(this.password, 10)
            .then((hash) => {
                this.password = hash;
                next();
            })
            .catch(next)
    } else {
        next()
    }
});

schema.method("checkPassword", function (password) {
    console.log(`comparing ${password} ${this.password}`)
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", schema);
module.exports = User;


