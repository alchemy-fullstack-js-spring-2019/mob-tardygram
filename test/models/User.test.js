require('dotenv').config();
const mongoose = require('mongoose');
const { untokenize } = require('../../lib/utils/token');
const User = require('../../lib/models/User');
require('../data-helpers');

describe('User model', () => {
  it('validates a good model', () => {
    const user = new User({
      username: 'tom@myspace.com'
    });
    
    expect(user.toJSON()).toEqual({
      username: 'tom@myspace.com',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });

  it('has temp pw', () => {
    const user = new User({
      username: 'Steve',
      password: 'smurf'
    });

    expect(user._tempPassword).toEqual('smurf');
  });

  it('can compare a good password', () => {
    return User.create({ username: 'Steve', profilePhoto: 'photo.jpg', password: 'stevespassword' })
      .then(user => {
        return user.compare('stevespassword');
      })
      .then(result => expect(result).toBeTruthy());
  });

  it('can compare a bad password', () => {
    return User.create({ username: 'Steve', profilePhoto: 'photo.jpg', password: 'stevespassword' })
      .then(user => {
        return user.compare('NOTstevespassword');
      })
      .then(result => expect(result).toBeFalsy());
  });

  it('can create an authToken', () => {
    return User.create({ username: 'Steve', profilePhoto: 'photo.jpg', password: 'stevespassword' })
      .then(user => {
        const token = user.authToken();
        const payload = untokenize(token);
        expect(payload).toEqual({
          username: 'Steve', profilePhoto: 'photo.jpg', _id: user._id.toString()
        });
      });
  });

  it('can create an authToken with DB', () => {
    const user = new User({
      username: 'Steve', profilePhoto: 'photo.jpg', passwordHash: 'randomHash'
    });

    const token = user.authToken();
    const payload = untokenize(token);
    expect(payload).toEqual({
      username: 'Steve', profilePhoto: 'photo.jpg', _id: user._id.toString()
    });
  });
});
