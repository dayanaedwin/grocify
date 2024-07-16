const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.exports = (req, res, next) => {
    const SECRET = process.env.SECRET;
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization denied, No token' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};