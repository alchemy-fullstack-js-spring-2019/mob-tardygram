require('dotenv').config();
const { tokenize } = require('../../lib/utils/token');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');

describe('ensureAuth middlware', () => {
  it('validates a good token', done => {
    const token = tokenize({
      username: 'funky',
      profilePhotoUrl: 'string.jpg'
    });

    const req = {
      token
    };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        username: 'funky',
        profilePhotoUrl: 'string.jpg'
      });
      done();
    };
    ensureAuth(req, res, next);
  });
});
