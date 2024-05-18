const mongoose = require("mongoose");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken")



module.exports.create = (req, res, next) => {
    const userData = req.body
    User.findOne({ email: userData.email })
        .then((userFound) => {
            if (userFound) {
                res.status(409).json({ message: "User validation failed", errors: { email: { message: `Email already exist` } } })
            } else {
                User.create(userData)
                    .then((user) => {
                        res.json(user)
                    })
                    .catch((error) => {
                        if (error instanceof mongoose.Error.ValidationError) {
                            res.status(400).json({ errors: error.errors })
                        } else {
                            next(error)
                        }
                    })
            }
        })
}


module.exports.login = (req, res, next) => {
    console.info(req.body)
    User.findOne({ email: req.body.email })
        .then((user) => {
            console.info({ user })
            if (user) {
                user.checkPassword(req.body.password)
                    .then((match) => {
                        console.info({ match })
                        if (match) {
                            const accessToken = jwt.sign({ sub: user.id, exp: Date.now() / 1000 + 3600 }, process.env.JWT_SECRET);
                            res.json({ accessToken })

                        } else {
                            res.status(401).json({ message: "Invalids credentials" })
                        }
                    })
                    .catch(next)

            } else {
                res.status(401).json({ message: "Invalids credentials" })

            }
        })
        .catch(next)

}




module.exports.profile = (req, res, next) => {

    res.json(req.user);
};

module.exports.update = (req, res, next) => {
    const { name, email, birthDate, genre, location, favorites,id } = req.body;
    const body = { name, email, birthDate, genre, location, favorites,id };

    User.findByIdAndUpdate(req.user.id, body, { runValidators: true, new: true })
        .then((user) => {
            if (user) {
                res.json(user)
            } else {
                res.status(401).json({ message: "User not found" })
            }
        })
        .catch((error) => next(error))
}

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.user.id)
        .then((user) => {
            console.info(`user with name  ${user.name}have been delete`)
            next()
        })
        .catch((error) => next(error))
}

module.exports.removeFavorites = (req, res, next) => {
    const { movieId } = req.body;
    const { id } = req.params;

    console.log("movieId", movieId);
    User.findByIdAndUpdate(
        id,
        { $pull: { favorites: movieId } }, // Utiliza $pull para eliminar un elemento de un array
        { new: true } // Para que devuelva el documento actualizado
    )
    .then((updatedUser) => {
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            console.log("User not found");
            throw new Error("User not found");
        }
    })
    .catch((error) => next(error));
};