const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentBy: {
    required: true,
    ref: 'User',
    type: mongoose.Types.ObjectId
  },
  post: {
    required: true,
    ref: 'Post',
    type: mongoose.Types.ObjectId
  },
  comment: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model('Comment', commentSchema);
