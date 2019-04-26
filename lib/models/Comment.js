const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  username: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thread: {
    type: mongoose.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  body: {
    type: String,
    required: true
  }
},
{
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  } 
});

module.exports = mongoose.model('Comment', commentSchema);
