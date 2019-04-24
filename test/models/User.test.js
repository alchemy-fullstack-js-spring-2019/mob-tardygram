require('dotenv').config();
require('../data/dataHelpers');
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
// grab tokenize & untokenize

describe('USER TESTS', () => {
  it('create user model', () => {
    const user = new User({
      username: 'username',
      profilePhotoUrl: 'string',
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      username: 'username',
      profilePhotoUrl: 'string',
    });
  });

  it('requires a username', () => {
    const user = new User({
      profilePhotoUrl: 'hi'
    });
    const errors = user.validateSync().errors;

    expect(errors.username.message).toEqual('Path `username` is required.');
  });
});
