const { hashFn, compare } = require('../../lib/utils/hash');

describe('test hash functions', () => {
  const password = '123';
  it('uses hash function to take a regular string and make it hashed', async() => {

    const hashedPassword = await hashFn(password);
    expect(hashedPassword).toEqual(expect.any(String));
    expect(hashedPassword).not.toEqual(password);
  });
});
