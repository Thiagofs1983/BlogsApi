const UserService = require('../services/UserService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await UserService.login({ email, password });
  if (!token) return res.status(400).json({ message: 'Invalid fields' });
  res.status(200).json({ token });
};

const create = async (req, res) => {
  const token = await UserService.create(req.body);
  if (!token) return res.status(409).json({ message: 'User already registered' });
  res.status(201).json({ token });
};

const getUser = async (req, res) => {
  const users = await UserService.getUser();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id);
  if (!result) return res.status(404).json({ message: 'User does not exist' });
  res.status(200).json(result);
};

const removeUser = async (req, res) => {
  const email = req.user;
  await UserService.removeUser(email);
  res.status(204).end();
};

module.exports = {
  login,
  create,
  getUser,
  getUserById,
  removeUser,
};