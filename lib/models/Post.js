const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
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

module.exports = mongoose.model('Post', postSchema);
