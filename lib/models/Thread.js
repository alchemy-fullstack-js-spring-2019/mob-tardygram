const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
  username: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  }, 
  photoUrl:{
    type: String,
    required: true,
    unique: true
  }, 
  caption: {
    type: String
  }, 
  hashtags: [{ type: String }]
},
{
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  } 
});

module.exports = mongoose.model('Thread', threadSchema);

