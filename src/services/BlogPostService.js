const Sequelize = require('sequelize');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { BlogPost, User, Category, PostCategory } = require('../database/models');

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

const createPost = async (body, emailUser) => {
  const transactionResult = await sequelize.transaction(async (transaction) => {
    const { title, content, categoryIds } = body;
    const { id } = await User.findOne({ where: { email: emailUser } });
    
    const result = await BlogPost.create({ title, content, userId: id }, { transaction });
    
    const verifyCategory = await Promise.all(categoryIds.map(async (cat) => {
      const resultFind = await Category.findByPk(cat);
      if (!resultFind) return null;
      return {
        categoryId: cat,
        postId: result.id,
      };
    }));
    
    if (verifyCategory.includes(null)) return null;
    console.log(verifyCategory);
    await PostCategory.bulkCreate(verifyCategory, { transaction });
    return result;
  });
  return transactionResult;
};

module.exports = {
  getAllBlogPost,
  getPostById,
  createPost,
};