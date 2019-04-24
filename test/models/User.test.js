require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { untokenize, tokenize } = require('../../lib/utils/token');

describe('User model', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/tardygram', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    });
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('has a username, password,hash, and prof photo', () => {
    const user = new User({
      username: 'Cool Thing',
      password: 'password',
      profilePhotoUrl: 'string.jpg'
    });

    expect(user.toJSON()).toEqual({
      username: 'Cool Thing',
      profilePhotoUrl: 'string.jpg',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has a _tempPassword', () => {
    const user = new User({
      username: 'Cool Thing',
      password: 'password',
      profilePhotoUrl: 'string.jpg'
    });

    expect(user._tempPassword).toEqual('password');
  });

  it('can compare passwords', () => {
    return User.create({
      username: 'Cool Thing',
      password: 'password1234',
      profilePhotoUrl: 'string.jpg'
    })
      .then(user => {
        return user.compare('password1234');
      })
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('can compare bad passwords', () => {
    return User.create({
      username: 'Cool Thing',
      password: 'password',
      profilePhotoUrl: 'string.jpg'
    })
      .then(user => {
        return user.compare('password1234');
      })
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('can create an auth token', () => {
    return User.create({
      username: 'Cool Thing',
      password: 'password',
      profilePhotoUrl: 'string.jpg'
    })
      .then(user => {
        const token = user.authToken();
        const payload = untokenize(token);
        expect(payload).toEqual({
          username: 'Cool Thing',
          profilePhotoUrl: 'string.jpg',
          _id: expect.any(String)
        });
      });
  });

  it('finds a token', () => {
    return User.create({
      username: 'Cool Thing',
      password: 'password',
      profilePhotoUrl: 'string.jpg'
    })
      .then(payload => {
        return tokenize(payload);
      })
      .then(token => {
        return User.findByToken(token);
      })
      .then(foundUser => {
        expect(foundUser).toEqual({
          username: 'Cool Thing',
          _id: expect.any(String),
          profilePhotoUrl: 'string.jpg'
        });
      });
  });
});
