const UserService = require('../services/UserService');

const SERVER_ERROR = { message: 'Algo de errado no servidor' };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.login({ email, password });
    if (!token) return res.status(400).json({ message: 'Invalid fields' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

const create = async (req, res) => {
  try {
    const token = await UserService.create(req.body);
    if (!token) return res.status(409).json({ message: 'User already registered' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

const getUser = async (req, res) => {
  try {
    const users = await UserService.getUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserService.getUserById(id);
    if (!result) return res.status(404).json({ message: 'User does not exist' });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

const removeUser = async (req, res) => {
  try {
    const email = req.user;
    await UserService.removeUser(email);
    res.status(204).end();
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

module.exports = {
  login,
  create,
  getUser,
  getUserById,
  removeUser,
};