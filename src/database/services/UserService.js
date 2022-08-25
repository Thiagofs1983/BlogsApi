const { user } = require('../models');
const generateToken = require('../../utils/generateToken');

const login = async (body) => {
  const { email, password } = body;
  const result = await user.findOne({ where: { email } });
  if (!result.password === password) {
    const err = new Error('Invalid fields');
    err.status = 400;
    throw err;
  }
  const token = generateToken(email);
  return token;
};

module.exports = {
  login,
};