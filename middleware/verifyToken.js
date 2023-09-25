const jwt = require("jsonwebtoken");
const handleError = require("./error");
const verifyToken = (req, res, next) => {
    // const token = req.cookies.access_token;

    // if (!token) {
    //     next(handleError(401, "Your are not Authenticated"));
    // }

    let token;

    // Check if the token is present in cookies
    if (req.cookies && req.cookies.access_token) {
        token = req.cookies.access_token;
    }

    // If not found in cookies, check the "Authorization" header
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        const tokenParts = authHeader.split(' ');

        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
            token = tokenParts[1];
        }
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

