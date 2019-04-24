require('../connect-db');
const mongoose = require('mongoose');
const User = require('../../lib/models/User');

describe('User model tests', () => {
  it('has a username, hashed password, and profilePhotoUrl', () => {
    const user = new User({
      username: 'test',
      passwordHash: 'randomstring'
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      username: 'test',
      passwordHash: 'randomstring',
      profilePhotoUrl: 'https://i.pinimg.com/736x/9f/81/2d/9f812d4cf313e887ef99d8722229eee1--facebook-profile-profile-pictures.jpg'
    });
  });

  it('has a required username', () => {
    const user = new User({});
    const errors = user.validateSync().errors;
    expect(errors.username.message).toBe('Path `username` is required.');
  });
  it('stores a temp password', () => {
    const user = new User({
      username: 'test person',
      password: 'test123'
    });
    expect(user.toJSON()).toEqual({
      username: 'test person',
      _id: expect.any(mongoose.Types.ObjectId),
      profilePhotoUrl: expect.any(String)
    });
    expect(user._tempPassword).toEqual('test123');
  });
  it('creates hash with new user', async() => {
    const user = await User.create({
      username: 'test person',
      password: 'test123'
    });
    console.log(typeof user._id, typeof user.passwordHash, typeof user.profilePhotoUrl);
    expect(user).toEqual({
      username: 'test person',
      _id: expect.any(mongoose.Types.ObjectId),
      profilePhotoUrl: expect.any(String),
      passwordHash: expect.any(String),
      __v: 0
    });
  });
});

