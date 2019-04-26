require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');

describe('jwt token', () => {
  it('can create a token', () => {
    const token = tokenize({
      _id: '1234',
      username: 'megan',
      profilePhotoUrl: 'string.jpg'
    });
    expect(token).toEqual(expect.any(String));
  });

  it('can untokenize tokens', () => {
    const token = tokenize({
      _id: '1234',
      username: 'megan',
      profilePhotoUrl: 'string.jpg'
    });

    const obj = untokenize(token);
    expect(obj).toEqual({
      _id: '1234',
      username: 'megan',
      profilePhotoUrl: 'string.jpg'
    });
  });
});
