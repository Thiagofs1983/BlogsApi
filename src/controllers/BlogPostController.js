const BlogPostService = require('../services/BlogPostService');

const SERVER_ERROR = { message: 'Algo de errado no servidor' };

const getAllBlogPost = async (req, res) => {
  try {
    const result = await BlogPostService.getAllBlogPost();
    res.status(200).json(result);  
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BlogPostService.getPostById(id);
    if (!result) return res.status(404).json({ message: 'Post does not exist' });
    res.status(200).json(result);  
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

const createPost = async (req, res) => {
  try {
    const emailUser = req.user;
    const { title, content, categoryIds } = req.body;
    const result = await BlogPostService.createPost({ title, content, categoryIds }, emailUser);
    if (!result) return res.status(400).json({ message: '"categoryIds" not found' });
    res.status(201).json(result);  
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.user;
    const result = await BlogPostService.updatePost(req.body, id, email);
    if (!result) return res.status(401).json({ message: 'Unauthorized user' });
    res.status(200).json(result);  
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.user;
    const result = await BlogPostService.removePost(id, email);
    if (result === null) return res.status(404).json({ message: 'Post does not exist' });
    if (result === 0) return res.status(401).json({ message: 'Unauthorized user' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

const searchPost = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await BlogPostService.searchPost(q);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(SERVER_ERROR);
  }
};

module.exports = {
  getAllBlogPost,
  getPostById,
  createPost,
  updatePost,
  removePost,
  searchPost,
};