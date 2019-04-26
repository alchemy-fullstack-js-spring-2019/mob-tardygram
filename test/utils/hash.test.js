const { hashFn, compare } = require('../../lib/utils/hash');

describe('test hash functions', () => {
  const password = '123';
  it('uses hash function to take a regular string and make it hashed', async() => {
    const hashedPassword = await hashFn(password);
    expect(hashedPassword).toEqual(expect.any(String));
    expect(hashedPassword).not.toEqual(password);
  });

  it('can compare passwords', async() => {
    const hashedPassword = await hashFn(password);
    const result1 = await compare(password, hashedPassword);
    const result2 = await compare('890', hashedPassword);
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });
});
