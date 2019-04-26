const mongoose = require('mongoose');
const { hash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../../lib/utils/token');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  profilePhotoUrl: {
    type: String
  },
  passwordHash: String
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash,
      delete ret.__v;
    }
  }
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});


userSchema.pre('save', function(next) {
  hash(this._tempPassword)
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

userSchema.statics.topUsers = function() {
  return this.model('Post').aggregate([
    {
      '$group': {
        '_id': '$user', 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': '_id', 
        'foreignField': '_id', 
        'as': 'users'
      }
    }, {
      '$unwind': '$users'
    }, {
      '$lookup': {
        'from': 'posts', 
        'localField': '_id', 
        'foreignField': 'user', 
        'as': 'posts'
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

module.exports = mongoose.model('User', userSchema);
