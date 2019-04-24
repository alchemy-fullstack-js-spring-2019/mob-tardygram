const mongoose = require('mongoose');
const Comment = require('../../lib/models/Comment');

describe('comment model', () => {
  it('has a user, reference to a user, post and comment', () => {
    const comment = new Comment({
      commentBy: new mongoose.Types.ObjectId(),
      post: new mongoose.Types.ObjectId(),
      comment: 'yo'
    });
    expect(comment.toJSON()).toEqual({
      commentBy: expect.any(mongoose.Types.ObjectId),
      post: expect.any(mongoose.Types.ObjectId),
      comment: 'yo',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
