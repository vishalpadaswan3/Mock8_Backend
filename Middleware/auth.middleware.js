const jwt  = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        let payload = jwt.verify(token, process.env.token_key);
        req.id = payload.id;
        // console.log(req.id)
        next();
    } catch (error) {
        res.status(400).json({msg: "Invalid Token"})
    }
}

module.exports = {authMiddleware}