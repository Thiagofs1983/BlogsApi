require('dotenv').config();
require('express-async-errors');
const app = require('./api');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const BlogPostService = require('./controllers/BlogPostController');
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

app.post(
  '/categories', tokenValidation, validate.validateNewCategory, CategoryController.createCategory,
);

app.get('/categories', tokenValidation, CategoryController.getAll);

app.get('/post', tokenValidation, BlogPostService.getAllBlogPost);

app.get('/post/:id', tokenValidation, BlogPostService.getPostById);

app.use((err, req, res, _next) => {
  const { status, message } = err;
  res.status(status).json({ message });
});

app.listen(port, () => console.log('ouvindo porta', port));
