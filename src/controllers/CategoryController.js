const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res) => {
  const name = req.body;
  const result = await CategoryService.createCategory(name);
  res.status(201).json(result);
};

const getAll = async (req, res) => {
  const result = await CategoryService.getAll();
  res.status(200).json(result);
};

module.exports = {
  createCategory,
  getAll,
};