const User = require('../models/User');

function bearerToken(req, res, next) {
  const head = req.get('authorization') || '';
  const token = head.replace(/Bearer\s/i, '');
  req.token = token;
  next();
}

function ensureAuth(req, res, next) {
  return User
    .findByToken(req.token)
    .then(user => {
      if(!user) {
        const error = new Error('Invalid Token');
        error.status = 400;
        return next(error);
      }
      req.user = user;
      next();
    });
}

module.exports = {
  bearerToken, ensureAuth
};
