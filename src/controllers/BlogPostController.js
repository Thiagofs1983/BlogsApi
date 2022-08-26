const BlogPostService = require('../services/BlogPostService');

const getAllBlogPost = async (req, res) => {
  const result = await BlogPostService.getAllBlogPost();
  res.status(200).json(result);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await BlogPostService.getPostById(id);
  if (!result) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(result);
};

module.exports = {
  getAllBlogPost,
  getPostById,
};