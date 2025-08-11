const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

// For admin routes
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') 
    return res.status(403).send('Admin access required');
  next();
};