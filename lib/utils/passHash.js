const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

function passHash(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = passHash;
