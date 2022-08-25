const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env;

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
};

module.exports = generateToken;