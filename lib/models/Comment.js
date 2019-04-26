const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentBy: {
    ref: 'User',
    type: mongoose.Types.ObjectId,
    required: true
  },
  post: {
    ref: 'Post',
    type: mongoose.Types.ObjectId,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
