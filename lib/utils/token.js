require('dotenv').config();

const jwt = require('jsonwebtoken');
const EXPIRES_IN = '1d';
const tokenize = payload => {
  const token = jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: EXPIRES_IN });
  return token;
};

module.exports = { tokenize };
