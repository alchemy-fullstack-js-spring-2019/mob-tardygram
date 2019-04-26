const mongoose = require('mongoose');
require('../utils/data-helper');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');
const Comment = require('../../lib/models/Comment');

describe('Comment model', () => {

  it('has a Comment', () => {
    return Promise.all([
      User.findOne(),
      Post.findOne()
    ])
      .then(([user, post]) => {
        const comment = new Comment({
          commentBy: user._id,
          post: post._id,
          comment: 'this is a comment'
        });
        expect(comment.toJSON()).toEqual({
          commentBy: expect.any(mongoose.Types.ObjectId),
          post: expect.any(mongoose.Types.ObjectId),
          comment: 'this is a comment',
          _id: expect.any(mongoose.Types.ObjectId)
        });
      });
  });

  it('has required fields', () => {
    const comment = new Comment({});
    const errors = comment.validateSync().errors;
    expect(errors.commentBy.message).toEqual('Path `commentBy` is required.');
    expect(errors.post.message).toEqual('Path `post` is required.');
    expect(errors.comment.message).toEqual('Path `comment` is required.');
  });
});
