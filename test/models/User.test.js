require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const {  tokenize, untokenize } = require('../../lib/utils/token');
const connect = require('../../lib/utils/connect');

describe('USER TESTS', () => {
  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  
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

  it('stores a temp password', () => {
    const user = new User({
      username: 'cheeky',
      password: 'abc123'
    });
    expect(user._tempPassword).toEqual('abc123');
  });

  it('compares a password and a hashedPassword', () => {
    return User.create({
      username: 'cheeky',
      password: 'abc123'
    })
      .then(user => {
        return user.compare('abc123');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });
  it('compares a password and a hashedPassword', () => {
    return User.create({
      username: 'cheeky',
      password: 'abc555'
    })
      .then(user => {
        return user.compare('abc123');
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });
  it('creates an auth token', () => {
    return User.create({
      username: 'dude',
      password:'bro' })
      .then(user => {
        const token = user.authToken();
        const payload = untokenize(token);
        expect(payload).toEqual({
          _id: user._id.toString(),
          username: 'dude'
        });
      });
  });
  
  it('can find a user by token', () => {
    return User.create({
      username: 'slammy',
      password: 'cooool'
    })
      .then(user => {
        return tokenize(user);
      })
      .then(token => {
        return User.findByToken(token);
      })
      .then(foundUser => {
        expect(foundUser).toEqual({
          _id: expect.any(String),
          username: 'slammy'
        });
      });
  });
});
