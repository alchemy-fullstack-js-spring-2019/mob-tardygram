require('../connect-db');
const mongoose = require('mongoose');
const Post = require('../../lib/models/Post');

describe('Post model tests', () => {
  it('has a user, photo url, caption, and hashtags', () => {
    const userObjectId = new mongoose.Types.ObjectId;
    const post = new Post({
      user: userObjectId,
      photoUrl: 'photostring',
      caption: 'test caption',
      hashtags: ['omg', 'wow', 'test']
    });

    expect(post.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      user: userObjectId,
      photoUrl: 'photostring',
      caption: 'test caption',
      hashtags: ['omg', 'wow', 'test']
    });
  });

  it('has a required user field', () => {
    const post = new Post({});

    const errors = post.validateSync().errors;
    expect(errors.user.message).toBe('Path `user` is required.');
  });
});
