const User = require('../../lib/models/User');
const mongoose = require('mongoose');

describe('User model', () => {
  it('makes a user', () => {
    const user = new User({
      username: 'Miss Testy'
    });
    expect(user.toJSON()).toEqual({
      username: 'Miss Testy',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
