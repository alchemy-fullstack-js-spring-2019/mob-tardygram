const jwt = require('jsonwebtoken');

const EXPIRE = '24h';

function tokenize(payload) {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRE });
}

module.exports = {
  tokenize
};
