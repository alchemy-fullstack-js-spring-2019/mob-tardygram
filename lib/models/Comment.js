const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  comment: {
    
    type: String,
    require: true
  }
}, {
  versionKey: false
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
