const { hash, compare } = require('../../lib/utils/hash');

describe('hashing functions', () => {
  it('hashes a password', () => {
    return hash('password')
      .then(hashedPassword => {
        expect(hashedPassword).toEqual(expect.any(String));
      });
  });

  it('compares passwords', () => {
    const password = 'trustno1';

    return hash(password)
      .then(hashedPassword => {
        return compare('trustno1', hashedPassword);
      })
      .then(compareResult => {
        expect(compareResult).toBeTruthy();
      });
  });

  it('compares passwords', () => {
    const password = 'trustno1';

    return hash(password)
      .then(hashedPassword => {
        return compare('1pig=poo', hashedPassword);
      })
      .then(compareResult => {
        expect(compareResult).toBeFalsy();
      });
  });
});
