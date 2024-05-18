const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

module.exports.checkAuth = (req, res, next) => {
    // extract jwt from Authorization header
    const [ schema, token ] = req.headers?.authorization?.split(" ");
    switch (schema.toUpperCase()){
        case "BEARER":
            //verify signature and decoded jwt  (jwt,verify)
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: err.message })
        }
        //extract "sub" from jwt payload
        const sub = decoded.sub
        //load user from database

        User.findById(sub)
            .then((user) => {
                if (user) {
                    //save user on request (req.user)
                    req.user = user
                    next()
                } else {
                    res.status(401).json({ message: "Unauthorized" })
                }

            })
            .catch(next)
    });
    break;
    default:
      res.status(401).json({ message: `Unsupported authorization schema Basic ${schema}` });

    }

    
}