require('dotenv').config();
const jwt = require('jsonwebtoken');
const { tokenize } = require('../../lib/utils/token');


describe('tokens', () => {
  it('create a token', () => {
    const token = tokenize({ username: 'billy' });
    expect(token).toEqual(expect.any(String));
  });
});
