require('dotenv').config();
const { tokenize, untokenize } = require('../../lib/utils/token');
const { ensureAuth } = require('../../lib/middleware/ensureAuth');

describe('ensure auth', () => {
  it('validates a good token', done => {
    const token = tokenize({
      username: 'me'
    });

    const req = { token };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        username: 'me'
      });
      done();
    };
    ensureAuth(req, res, next);
  });
});
