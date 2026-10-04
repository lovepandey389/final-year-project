const jwt = require('jsonwebtoken');
const store = require('../config/store');
const { getIsConnected } = require('../config/db');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'citybuddy_super_secret_jwt_key_2026_dev');
    
    if (getIsConnected()) {
      req.user = await User.findById(decoded.id).select('-password');
    } else {
      req.user = store.findUserById(decoded.id);
    }

    if (!req.user) {
      return res.status(401).json({ message: 'User not found or session invalid' });
    }

    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
};

module.exports = { protect, adminOnly };
