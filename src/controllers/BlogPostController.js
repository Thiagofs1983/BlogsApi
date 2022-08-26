const BlogPostService = require('../services/BlogPostService');

const getAllBlogPost = async (req, res) => {
  const result = await BlogPostService.getAllBlogPost();
  res.status(200).json(result);
};

module.exports = {
  getAllBlogPost,
};