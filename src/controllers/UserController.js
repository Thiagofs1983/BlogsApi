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

module.exports = {
  login,
  create,
};