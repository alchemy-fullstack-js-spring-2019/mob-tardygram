require('../connect-db');
const { ensureAuth, bearerToken } = require('../../lib/middleware/ensure-auth');
const { tokenize } = require('../../lib/utils/token');

describe('ensure auth middleware', () => {
  it('validates bearer token', done => {
    const token = 'Bearer tokenstring';
    const req = { get: () => token };
    const res = {};
    const next = () => {
      expect(req.token).toEqual('tokenstring');
      done();
    };
    bearerToken(req, res, next);
  });
  
  it('validates a good token', done => {
    const token = tokenize({ username:'test person' });
    const req = { token };
    const res = {};
    const next = () => {
      expect(req.user).toEqual({
        username: 'test person'
      });
      done();
    };
    ensureAuth(req, res, next);
  });
});
