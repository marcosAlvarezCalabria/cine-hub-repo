const express = require ("express");
const router = express.Router();
const movie = require("../controllers/movies.controller")
const user = require("../controllers/users.controllers");
const comments = require("../controllers/comments.controllers")
const authMiddleware = require ("../middlewares/auth.middleware.js")

/***************movies********* */
router.get("/movies", authMiddleware.checkAuth, movie.list);
router.get("/movies/:id", movie.detail);

//*****************user******** */
router.post("/user", user.create);
router.get("/profile",authMiddleware.checkAuth, user.profile);
router.post("/login", user.login)
router.patch("/profile" ,authMiddleware.checkAuth, user.update)//update
router.delete("/user",authMiddleware.checkAuth, user.delete)

/*********************comments***** */
router.post("/movie/:id/comments",authMiddleware.checkAuth,comments.create)
router.patch("/movie/:id/comments", comments.update)
router.delete("/movie/:id/comments", comments.delete)

/*****************favorites***************** */

router.patch("/user/favorites/:id/remove",authMiddleware.checkAuth, user.removeFavorites)





module.exports = router;