require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('jwt token', () => {
  it('can create a jwt token', () => {
    const token = tokenize({
      name: 'trust',
      email: 'no1.net'
    });
    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize a jwt token', () => {
    const token = tokenize({
      name: 'trust',
      email: 'no1.net'
    });
    const obj = untokenize(token);
    expect(obj).toEqual({
      name: 'trust',
      email: 'no1.net'
    });
  });
});
