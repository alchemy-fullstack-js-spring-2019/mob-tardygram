const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

const hashFn = password => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const compare = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  hashFn,
  compare
};
