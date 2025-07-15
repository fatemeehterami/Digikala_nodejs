const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

const tokenBlacklist = new Set();

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token has been logged out.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
}

function blacklistToken(token) {
    tokenBlacklist.add(token);
    setTimeout(() => {
        tokenBlacklist.delete(token);
    }, 3600 * 1000);
}

module.exports = { verifyToken, blacklistToken };
