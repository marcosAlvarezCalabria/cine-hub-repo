const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { env } = require("../configs/env.config");

module.exports.checkAuth = (req, res, next) => {
  const [scheme, bearerToken] = req.headers?.authorization?.split(" ") || [];
  const token = req.cookies?.accessToken || (scheme?.toUpperCase() === "BEARER" ? bearerToken : null);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded?.sub) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return User.findById(decoded.sub)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        return next();
      })
      .catch(next);
  });
};
