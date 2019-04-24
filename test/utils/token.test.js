require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize, untokenize } = require('../../lib/utils/token');


describe('tokens', () => {
  it('create a token', () => {
    const token = tokenize({ username: 'billy' });
    expect(token).toEqual(expect.any(String));
  });

  it('takes the mumby jumby and returns an object', () => {
    const token = tokenize({ username: 'billy' });
    const obj = untokenize(token);
    expect(obj).toEqual({ username: 'billy' });
  });

  it('returns error for bad token', () => {
    expect(() => untokenize('asbd')).toThrow('Bad token');
  });
});
