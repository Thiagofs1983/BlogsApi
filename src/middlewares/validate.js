const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email.length === 0 || password.length === 0) {
    const err = new Error('Some required fields are missing');
    err.status = 400;
    throw err;
  }
  next();
};

module.exports = {
  validateLogin,
};