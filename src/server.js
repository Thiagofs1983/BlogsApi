require('dotenv').config();
require('express-async-errors');
const app = require('./api');
const UserController = require('./controllers/UserController');
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

app.use((err, req, res, _next) => {
  const { status, message } = err;
  res.status(status).json({ message });
});

app.listen(port, () => console.log('ouvindo porta', port));
