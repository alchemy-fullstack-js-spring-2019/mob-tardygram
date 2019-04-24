const User = require('../models/User');

const bearerToken = (req, res, next) => {
  const authHeader = req.get('Authorization') || '';
  const token = authHeader.replace(/Bearer\s/i, '');
  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  return User
    .findByToken(req.token)
    .then(user => {
      if(!user) {
        const error = new Error('Token required fren');
        error.status = 400;
        return next(error);
      } else {
        req.user = user;
        next();
      }
    });
};

module.exports = {
  bearerToken,
  ensureAuth
};
