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
    type: String,
  },
  
  tags: {
    type: [String]
  }

});

postSchema.statics.getPopularPosts = function() {
  return this.model('Comment').aggregate([
    {
      '$group': {
        '_id': '$post', 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'count': -1
      }
    }, {
      '$limit': 10
    }, {
      '$lookup': {
        'from': 'posts', 
        'localField': '_id', 
        'foreignField': '_id', 
        'as': 'Post Info'
      }
    }, {
      '$unwind': '$Post Info'
    }
  ]);
};

module.exports = mongoose.model('Post', postSchema);
