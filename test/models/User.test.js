require('../connect-db');
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { untokenize } = require('../../lib/utils/token');

describe('User model tests', () => {
  it('has a username, hashed password, and profilePhotoUrl', () => {
    const user = new User({
      username: 'test',
    });

    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      username: 'test',
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

    expect(user.toJSON()).toEqual({
      username: 'test person',
      _id: expect.any(mongoose.Types.ObjectId),
      profilePhotoUrl: expect.any(String),
    });
  });
  it('can compare a good password', async() => {
    const user = await User.create({
      username: 'test person',
      password: '123'
    });
    const result = await user.compare('123');
    expect(result).toBeTruthy();

  });
  it('create a token', async() => {
    const user = await User.create({
      username: 'test person',
      password: '123'
    });
    const token = user.authToken();
    expect(untokenize(token)).toEqual({
      _id: expect.any(String),
      username: 'test person',
      profilePhotoUrl: expect.any(String)
    });
  });
});

