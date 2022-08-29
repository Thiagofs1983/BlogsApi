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

const createPost = async (req, res) => {
  const emailUser = req.user;
  const { title, content, categoryIds } = req.body;
  const result = await BlogPostService.createPost({ title, content, categoryIds }, emailUser);
  if (!result) return res.status(400).json({ message: '"categoryIds" not found' });
  res.status(201).json(result);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const email = req.user;
  const result = await BlogPostService.updatePost(req.body, id, email);
  if (!result) return res.status(401).json({ message: 'Unauthorized user' });
  res.status(200).json(result);
};

module.exports = {
  getAllBlogPost,
  getPostById,
  createPost,
  updatePost,
};