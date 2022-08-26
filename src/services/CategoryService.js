const { Category } = require('../database/models');

const createCategory = async (name) => {
  const result = await Category.create(name);
  return result;
};

const getAll = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  createCategory,
  getAll,
};