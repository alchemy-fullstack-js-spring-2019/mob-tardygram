const passHash = require('../../lib/utils/passHash');
const bcrypt = require('bcrypt');

describe('hash test', () => {
  it('will take a password and return a hashed password', () => {
    const password = 'myNeatPassword';
    return passHash(password)
      .then(hashedPassword => {
        return Promise.all([
          hashedPassword,
          bcrypt.hash(password, 10)
        ]);
      })
      .then(([hashedPassword, bcryptHashedPassword]) => {
        expect(hashedPassword).not.toEqual(bcryptHashedPassword);
        expect(hashedPassword).not.toEqual(password);
      });
  });
});
