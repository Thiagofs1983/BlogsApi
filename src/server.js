require('dotenv').config();
require('express-async-errors');
const app = require('./api');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const BlogPostController = require('./controllers/BlogPostController');
const validate = require('./middlewares/validate');
const tokenValidation = require('./middlewares/auth');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', validate.validateLogin, UserController.login);

app.post('/user', validate.validateNewUser, UserController.create);

app.get('/user', tokenValidation, UserController.getUser);

app.get('/user/:id', tokenValidation, UserController.getUserById);

app.delete('/user/me', tokenValidation, UserController.removeUser);

app.post(
  '/categories', tokenValidation, validate.validateNewCategory, CategoryController.createCategory,
);

app.get('/categories', tokenValidation, CategoryController.getAll);

app.get('/post', tokenValidation, BlogPostController.getAllBlogPost);

app.get('/post/:id', tokenValidation, BlogPostController.getPostById);

app.post('/post', tokenValidation, validate.validateCreatePost, BlogPostController.createPost);

app.put('/post/:id', tokenValidation, validate.validateUpdatePost, BlogPostController.updatePost);

app.delete('/post/:id', tokenValidation, BlogPostController.removePost);

app.use((err, req, res, _next) => {
  const { status, message } = err;
  console.error(err);
  res.status(status || 500).json({ message });
});

app.listen(port, () => console.log('ouvindo porta', port));
