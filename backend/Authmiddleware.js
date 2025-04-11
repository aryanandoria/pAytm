const jwt = require('jsonwebtoken');

const secret_key = '12345';

const AuthMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, secret_key);
            req.userId = decoded.id; // Attach user ID to the request

            console.log("User verified");
            next(); 
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
};

module.exports = { AuthMiddleware };
