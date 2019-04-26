const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photoUrl:{
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default:''
  },
  hashtags: [String]
});

postSchema.statics.topTen = function() {
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
      '$project': {
        'postId': '$_id', 
        '_id': false, 
        'count': true
      }
    }, {
      '$lookup': {
        'from': 'posts', 
        'localField': 'postId', 
        'foreignField': '_id', 
        'as': 'post'
      }
    }, {
      '$unwind': '$post'
    }
  ]);
};

module.exports = mongoose.model('Post', postSchema);
