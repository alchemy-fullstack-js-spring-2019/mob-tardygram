const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { hash, compare } = require('../../lib/utils/hash');

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
  });

  it('has a password', () => {
    const user = new User({
      username: 'bonnie',
      password: 'bananas'
    });

    expect(user._tempPassword).toEqual('bananas');
  });

  it('hashing and compare fn test', () => {
    User.create({
      username: 'dave',
      password: 'iamdave'
    })
      .then(user => {
        Promise.all([
          user,
          hash('iamdave')
        ])
          .then(([user, hashed]) => {
            return compare(user._tempPassword, hashed);
          })
          .then(res => {
            expect(res).toBeFalsy();
          });
      });
  });

  it('compares clear txt with pw hash', () => {
    const pw = 'stuffthings';
    User.create({
      username: 'cara',
      password: pw,
      passwordHash: '4769fnw'
    })
      .then(createdUser => {
        expect(createdUser.compare(pw)).toBe(false);
      });
  });



});
