const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Token not found' });
  }
  try {
    jwt.verify(authorization, JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;