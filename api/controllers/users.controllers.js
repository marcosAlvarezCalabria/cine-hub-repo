const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { env, isProduction } = require("../configs/env.config");

const authCookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: isProduction,
  path: "/",
  maxAge: 60 * 60 * 1000,
};

module.exports.create = (req, res, next) => {
  const userData = req.body;

  User.findOne({ email: userData.email })
    .then((userFound) => {
      if (userFound) {
        return res.status(409).json({
          message: "User validation failed",
          errors: { email: { message: "Email already exist" } },
        });
      }

      return User.create(userData)
        .then((user) => res.status(201).json(user))
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ errors: error.errors });
          }

          return next(error);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return user.checkPassword(req.body.password).then((match) => {
        if (!match) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("accessToken", accessToken, authCookieOptions);
        return res.status(200).json({ user });
      });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie("accessToken", authCookieOptions);
  res.status(204).send();
};

module.exports.profile = (req, res) => {
  res.json(req.user);
};

module.exports.update = (req, res, next) => {
  const { name, email, birthDate, genre, location, favorites } = req.body;
  const body = { name, email, birthDate, genre, location, favorites };

  User.findByIdAndUpdate(req.user.id, body, { runValidators: true, new: true })
    .then((user) => {
      if (user) {
        return res.json(user);
      }

      return res.status(404).json({ message: "User not found" });
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.clearCookie("accessToken", authCookieOptions);
      return res.status(204).send();
    })
    .catch((error) => next(error));
};

module.exports.removeFavorites = (req, res, next) => {
  const { movieId } = req.body;

  User.findByIdAndUpdate(req.user.id, { $pull: { favorites: movieId } }, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (updatedUser) {
        return res.status(200).json(updatedUser);
      }

      return res.status(404).json({ message: "User not found" });
    })
    .catch((error) => next(error));
};
