const express = require("express");
const rateLimit = require("express-rate-limit");
const movie = require("../controllers/movies.controller");
const appConfig = require("../controllers/app-config.controller");
const user = require("../controllers/users.controllers");
const comments = require("../controllers/comments.controllers");
const authMiddleware = require("../middlewares/auth.middleware.js");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many authentication attempts. Please try again later." },
});

router.get("/movies", movie.list);
router.get("/movies/:id", movie.detail);
router.get("/config/public", appConfig.publicConfig);

router.post("/user", authLimiter, user.create);
router.get("/profile", authMiddleware.checkAuth, user.profile);
router.post("/login", authLimiter, user.login);
router.post("/logout", authMiddleware.checkAuth, user.logout);
router.patch("/profile", authMiddleware.checkAuth, user.update);
router.delete("/user", authMiddleware.checkAuth, user.delete);

router.post("/movie/:id/comments", authMiddleware.checkAuth, comments.create);
router.patch("/movie/:id/comments", authMiddleware.checkAuth, comments.update);
router.delete("/movie/:id/comments", authMiddleware.checkAuth, comments.delete);

router.patch("/user/favorites/:id/remove", authMiddleware.checkAuth, user.removeFavorites);

router.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = router;
