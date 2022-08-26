const { User } = require('../database/models');
const generateToken = require('../utils/generateToken');

const login = async (body) => {
  const { email } = body;
  const result = await User.findOne({ where: { email } });
  if (!result) return null;
  const token = generateToken(email);
  return token;
};

const create = async (body) => {
  const { email } = body;
  const findEmail = await User.findOne({ where: { email } });
  if (findEmail !== null) return null;
  await User.create(body);
  const token = generateToken(email);
  return token;
};

const getUser = async () => {
  const result = await User.findAll({ attributes: { exclude: ['password'] } });
  return result;
};

module.exports = {
  login,
  create,
  getUser,
};