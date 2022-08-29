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

const getUserById = async (id) => {
  const result = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!result) return null;
  return result;
};

const removeUser = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  await User.destroy({ where: { id } });
};

module.exports = {
  login,
  create,
  getUser,
  getUserById,
  removeUser,
};