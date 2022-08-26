const Joi = require('joi');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email.length === 0 || password.length === 0) {
    const err = new Error('Some required fields are missing');
    err.status = 400;
    throw err;
  }
  next();
};

const validateNewUser = (req, res, next) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const err = error;
    err.status = 400;
    throw err;
  }
  next();
};

const validateNewCategory = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const err = error;
    err.status = 400;
    throw err;
  }
  next();
};

module.exports = {
  validateLogin,
  validateNewUser,
  validateNewCategory,
};