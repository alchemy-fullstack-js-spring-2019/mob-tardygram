const mongoose = require('mongoose');
const Post = require('../../lib/models/Post');

describe('post test', () => {
  it('makes a model', () => {
    const post = new Post({
      user: new mongoose.Types.ObjectId,
      photoUrl: 'photo',
    });

    expect(post.toJSON()).toEqual({
      user: expect.any(mongoose.Types.ObjectId),
      _id: expect.any(mongoose.Types.ObjectId),
      photoUrl: 'photo',
      tags: []
    });
  });

  it('requires a user', () => {
    const post = new Post({});
    const errors = post.validateSync().errors;
    expect(errors.user.message).toEqual('Path `user` is required.');
    expect(errors.photoUrl.message).toEqual('Path `photoUrl` is required.');
  });


});
