const CategoryService = require('../services/CategoryService');

const SERVER_ERROR = { message: 'Algo de errado no servidor' };

const createCategory = async (req, res) => {
  try {
    const name = req.body;
    const result = await CategoryService.createCategory(name);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await CategoryService.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

module.exports = {
  createCategory,
  getAll,
};