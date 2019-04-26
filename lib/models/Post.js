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

postSchema.statics.topPosts = function() {
  return this.model('Comment').aggregate([
    {
      '$group': {
        '_id': '$post', 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$lookup': {
        'from': 'posts', 
        'localField': '_id', 
        'foreignField': '_id', 
        'as': 'posts'
      }
    }, {
      '$unwind': '$posts'
    }, {
      '$lookup': {
        'from': 'comments', 
        'localField': '_id', 
        'foreignField': 'post', 
        'as': 'comments'
      }
    }, {
      '$sort': {
        'count': -1
      }
    }, {
      '$limit': 10
    }
  ]);
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
