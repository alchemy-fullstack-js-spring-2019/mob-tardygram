const mongoose = require('mongoose');
require('../utils/data-helper');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');

describe('Post model', () => {
  it('has a user', () => {
    return User.findOne()
      .then(user => {
        const post = new Post({
          user: user._id,
          photoUrl: 'string.jpg',
          caption: 'string caption',
          tags: ['awesome', 'cheese']
        });
        expect(post.toJSON()).toEqual({
          user: expect.any(mongoose.Types.ObjectId),
          photoUrl: 'string.jpg',
          caption: 'string caption',
          tags: ['awesome', 'cheese'],
          _id: expect.any(mongoose.Types.ObjectId)
        });
      });
  });

  it('has a required user field', () => {
    const post = new Post({
      photoUrl: 'image.jpg',
      caption: 'So much yes',
      tags: ['Squuuaad goalz', 'yesss']
    });
    const errors = post.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
  });
});
