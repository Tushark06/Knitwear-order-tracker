const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, access denied' });
    }
    
    try {
    const token = header.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
} catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
}
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied for this role' });
        }
        next();
    };
};

module.exports = { protect, requireRole };