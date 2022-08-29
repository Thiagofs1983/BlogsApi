const Sequelize = require('sequelize');

const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { Op } = Sequelize;

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
  const { title, content, categoryIds } = body;
  const { id } = await User.findOne({ where: { email: emailUser } });
  const transactionResult = await sequelize.transaction(async (transaction) => {
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
    
    await PostCategory.bulkCreate(verifyCategory, { transaction });
    return result;
  });
  return transactionResult;
};

const updatePost = async (body, idPost, email) => {
  const { id } = await User.findOne({ where: { email } });
  const result = await BlogPost.update(body, { where: { id: idPost, userId: id } });
  if (result[0] === 0) return null;
  const update = await BlogPost.findByPk(idPost, { include: [
    { model: User, as: 'user', attributes: { exclude: ['passowrd'] } },
    { model: Category, as: 'categories' },
  ] });
  return update;
};

const removePost = async (postId, email) => {
  const { id } = await User.findOne({ where: { email } });
  const post = await BlogPost.findByPk(postId);
  if (!post) return null;
  const remove = await BlogPost.destroy({ where: { id: postId, userId: id } });
  return remove;
};

const searchPost = async (q) => {
  const query = `%${q}%`;
  const result = await BlogPost.findAll({
    where: { [Op.or]: [{ title: { [Op.like]: query } }, { content: { [Op.like]: query } }] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

module.exports = {
  getAllBlogPost,
  getPostById,
  createPost,
  updatePost,
  removePost,
  searchPost,
};