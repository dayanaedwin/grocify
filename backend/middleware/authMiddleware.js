const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.auth = async (req, res, next) => {
    const SECRET = process.env.SECRET;
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied, No token' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error.message)
        res.status(401).json({ message: 'Invalid token' });
    }
};