const mongoose = require('mongoose');
const { hashFn, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String,
  profilePhotoUrl: {
    type: String,
    default: 'https://i.pinimg.com/736x/9f/81/2d/9f812d4cf313e887ef99d8722229eee1--facebook-profile-profile-pictures.jpg'
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
    }
  }
});

userSchema.virtual('password').set(function(passwordText) {
  this._tempPassword = passwordText;
});

userSchema.pre('save', function(next) {
  hashFn(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};

userSchema.statics.popular = function() {
  // top 10 users with the most total comments on their posts
  return this.model('Comment').aggregate([
    {
      '$group': {
        '_id': '$post', 
        'count': {
          '$sum': 1
        }
      }
    }, 
    {
      '$lookup': {
        'from': 'posts', 
        'localField': '_id', 
        'foreignField': '_id', 
        'as': 'post'
      }
    }, 
    {
      '$unwind': '$post'
    }, 
    {
      '$group': {
        '_id': '$post.user', 
        'count': {
          '$sum': 1
        }
      }
    }, 
    {
      '$sort': {
        'count': -1
      }
    }, 
    {
      '$limit': 10
    }, 
    {
      '$lookup': {
        'from': 'users', 
        'localField': '_id', 
        'foreignField': '_id', 
        'as': 'user'
      }
    }, 
    {
      '$unwind': '$user'
    }
  ]);
};

userSchema.statics.prolific = function() {
  // top 10 users with the mosts posts
  return this.model('Post').aggregate([
    {
      '$group': {
        '_id': '$user', 
        'count': {
          '$sum': 1
        }
      }
    }, 
    {
      '$project': {
        'userId': '$_id', 
        'count': true, 
        '_id': false
      }
    }, 
    {
      '$sort': {
        'count': -1
      }
    }, 
    {
      '$limit': 10
    }, 
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'userId', 
        'foreignField': '_id', 
        'as': 'user'
      }
    }, 
    {
      '$unwind': '$user'
    }
  ]);
};

userSchema.statics.leader = function() {
  // top 10 users with the most comments
  return this.model('Comment').aggregate([
    {
      '$group': {
        '_id': '$commentBy', 
        'count': {
          '$sum': 1
        }
      }
    }, 
    {
      '$project': {
        'userId': '$_id', 
        'count': true, 
        '_id': false
      }
    }, 
    {
      '$sort': {
        'count': -1
      }
    }, 
    {
      '$limit': 10
    }, 
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'userId', 
        'foreignField': '_id', 
        'as': 'user'
      }
    }, 
    {
      '$unwind': '$user'
    }
  ]);
};

userSchema.statics.impact = function() {
  // top 10 users with the most average comments per post
  return this.model('Comment').aggregate([
    {
      '$group': {
        '_id': '$post', 
        'count': {
          '$sum': 1
        }
      }
    }, 
    {
      '$lookup': {
        'from': 'posts', 
        'localField': '_id', 
        'foreignField': '_id', 
        'as': 'post'
      }
    }, 
    {
      '$unwind': '$post'
    }, 
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'post.user', 
        'foreignField': '_id', 
        'as': 'user'
      }
    }, 
    {
      '$unwind': '$user'
    }, 
    {
      '$group': {
        '_id': '$user', 
        'avgComments': {
          '$avg': '$count'
        }
      }
    }, 
    {
      '$sort': {
        'avgComments': -1
      }
    }, 
    {
      '$limit': 10
    }
  ]);
};

module.exports = mongoose.model('User', userSchema);
