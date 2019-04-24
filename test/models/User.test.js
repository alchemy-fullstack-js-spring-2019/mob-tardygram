require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
// grab tokenize & untokenize
const connect = require('../../lib/utils/connect');

describe('USER TESTS', () => {
  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
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

  it.only('compares a password and a hashedPassword', () => {
    return User.create({
      username: 'cheeky',
      password: 'abc123'
    })
      .then(user => {
        console.log(user);
        return user.compare('abc123');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });
});
