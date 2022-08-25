const UserService = require('../services/UserService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await UserService.login({ email, password });
  res.status(200).json({ token });
};

module.exports = {
  login,
};