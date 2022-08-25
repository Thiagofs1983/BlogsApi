const { User } = require('../database/models');
const generateToken = require('../utils/generateToken');

const login = async (body) => {
  const { email } = body;
  const result = await User.findOne({ where: { email } });
  if (!result) {
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