const { tokenize, untokenize } = require('../../lib/utils/token');

describe('token tests', () => {
  const payload = { username: 'joan', photoUrl: 'somelongstring' };
  it('creates a token', async() => {
    const token = await tokenize(payload);
    expect(token).toEqual(expect.any(String));
  });
});
