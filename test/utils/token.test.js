const { tokenize, untokenize } = require('../../lib/utils/token');

describe('token tests', () => {
  const payload = { username: 'joan', photoUrl: 'somelongstring' };
  it('creates a token', () => {
    const token = tokenize(payload);
    expect(token).toEqual(expect.any(String));
  });
  it('takes a token and verifies that it is valid.  returns payload on valid toeken ', () => {
    const token = tokenize(payload);
    const body = untokenize(token);
    expect(body).toEqual(payload);
  });
});
