const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key_here';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Token format: 'Bearer <token>'

    if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // Save user info in request object
        next();
    });
}

module.exports = authenticateToken;
