const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    ref: 'User',
    type: mongoose.Types.ObjectId,
    required: true
  },
  photoUrl: {
    type: String, 
    required: true
  },
  caption: {
    type: String
  },
  tags: {
    type: [String]
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
