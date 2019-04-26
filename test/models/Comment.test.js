const mongoose = require('mongoose');
const Comment = require('../../lib/models/Comment');

describe('tests the comment schema', () => {
  const userId = new mongoose.Types.ObjectId;
  const postId = new mongoose.Types.ObjectId;
  it('has a reference user, has a reference post, and has a comment', () => {


    const comment = new Comment({
      commentBy: userId,
      post: postId,
      comment: 'heyhey'
    });

    expect(comment.toJSON()).toEqual({
      commentBy: userId,
      post: postId,
      comment: 'heyhey',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
  it('gives an empty object thus triggers error for all required fields', () => {
    const comment = new Comment({});

    const errors = comment.validateSync().errors;
    
    expect(errors.commentBy.message).toEqual('Path `commentBy` is required.');
    expect(errors.post.message).toEqual('Path `post` is required.');
    expect(errors.comment.message).toEqual('Path `comment` is required.');
  });
});
