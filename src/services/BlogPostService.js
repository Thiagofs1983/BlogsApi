const { BlogPost, User, Category } = require('../database/models');

const getAllBlogPost = async () => {
  const result = await BlogPost.findAll(
    {
      include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    },
  );
  return result;
};

const getPostById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!result) return null;
  return result;
};

module.exports = {
  getAllBlogPost,
  getPostById,
};