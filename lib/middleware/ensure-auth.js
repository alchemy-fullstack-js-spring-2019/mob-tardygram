const User = require('../models/User');

const bearerToken = (req, res, next) => {
  const headerValue = req.get('Authorization') || '';
  const token = headerValue.replace('Bearer ', '');
  req.token = token;
  next();
};

const ensureAuth = async(req, res, next) => {
  const user = await User.findByToken(req.token);
  if(!user) {
    const error = new Error('Bogus Token!');
    error.status = 400;
    next(error);
  }
  req.user = user;
  next();
};

module.exports = { 
  bearerToken, 
  ensureAuth 
};
