const { User } = require('../database/models');
const generateToken = require('../utils/generateToken');

const login = async (body) => {
  const { email } = body;
  const result = await User.findOne({ where: { email } });
  if (!result) return null;
  const token = generateToken(email);
  return token;
};

module.exports = {
  login,
};