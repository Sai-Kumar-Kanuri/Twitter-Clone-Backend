const jwt = require("jsonwebtoken");
const handleError = require("./error");
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        next(handleError(401, "Your are not Authenticated"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            next(403, "Token is Invalid");
        }

        req.user = user;
        next();
    });
};

module.exports = verifyToken;

