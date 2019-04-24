require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');

describe('jwt token', () => {
  it('can create a token', () => {
    const token = tokenize({
      _id: '1234',
      username: 'megan',
      profilePhotoUrl: 'string.jpg'
    });
    expect(token).toEqual(expect.any(String));
  });
});
