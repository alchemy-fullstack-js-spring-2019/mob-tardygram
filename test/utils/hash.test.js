const { hash, compare } = require('../../lib/utils/hash');

describe('hashing passwords', () => {
  it('uses bcrypt to hash a password', () => {
    const password = 'hello';

    return hash(password)
      .then(hash => {
        expect(hash).toEqual(expect.any(String));
        expect(hash).not.toEqual(password);
      });
  });

  it('compares clear text to hash', () => {
    const password = 'hello';
    return hash(password)
      .then(hash => {
        return compare(password, hash)
          .then(results => {
            expect(results).toBeTruthy();
          });
      });
  });

  it('compares bad clear text to hash and fails', () => {
    const password = 'hello';
    return hash(password)
      .then(hash => {
        return compare('snark', hash)
          .then(results => {
            expect(results).toBeFalsy();
          });
      });

  });
});
