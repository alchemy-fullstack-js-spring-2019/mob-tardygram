require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');
const jwt = require('jsonwebtoken');

describe('JWT TOKEN', () => {
  
  it('can create a token', () => {
    const token = tokenize({
      username: 'username',
      _id: '123'
    });
    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize a token', () => {
    const token = tokenize({
      username: 'spot',
      photourl: 'sdddddd'
    });
    const obj = untokenize(token);

    expect(obj).toEqual({
      username: 'spot',
      photourl: 'sdddddd'
    });
  });

  it('can untokenize a bogus token', () => {
    expect(() => untokenize('12345')).toThrow('NUH UH BAD TOKEN');
  });

});
