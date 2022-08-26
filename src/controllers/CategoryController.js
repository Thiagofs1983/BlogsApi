const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res) => {
  const name = req.body;
  const result = await CategoryService.createCategory(name);
  res.status(201).json(result);
};

module.exports = {
  createCategory,
};