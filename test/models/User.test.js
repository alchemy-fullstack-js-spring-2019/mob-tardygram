const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model', () => {

  it('Create the user model', () => {
    const user = new User({
      username: 'dave',
      password: 'opensesame',
      profilePhotoUrl: 'image.jpg'
    });

    expect(user.toJSON()).toEqual({
      username: 'dave',
      profilePhotoUrl: 'image.jpg',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('requires a user name', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.username.message).toEqual('Path `username` is required.');
  })

});
