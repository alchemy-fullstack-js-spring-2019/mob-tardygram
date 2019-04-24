const jwt = require('jsonwebtoken');

const tokenize = payload => {
  return jwt.sign(
    { payload },
    process.env.AUTH_SECRET,
    { expiresIn: '24hr' }
  );
};

module.exports = {
  tokenize
};
