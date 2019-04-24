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
  caption: String,
  tags: [String]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
