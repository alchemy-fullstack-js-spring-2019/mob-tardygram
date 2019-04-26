const mongoose = require('mongoose');
const Comment = require('../../lib/models/Comment');

describe('COMMENT TESTS', () => {
  
  it('makes a comment model', () => {
    const comment = new Comment({
      commentBy: new mongoose.Types.ObjectId,
      post: new mongoose.Types.ObjectId,
      comment: 'arson is legal'
    });

    expect(comment.toJSON()).toEqual({
      commentBy: expect.any(mongoose.Types.ObjectId),
      post: expect.any(mongoose.Types.ObjectId),
      comment: 'arson is legal',
      _id: expect.any(mongoose.Types.ObjectId),
    });
  });
  it('requires all 3 fields', () => {
    const comment = new Comment({});
    const errors = comment.validateSync().errors;
    expect(errors.commentBy.message).toEqual('Path `commentBy` is required.');
    expect(errors.post.message).toEqual('Path `post` is required.');
    expect(errors.comment.message).toEqual('Path `comment` is required.');
  });
});
