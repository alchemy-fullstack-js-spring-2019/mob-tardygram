const mongoose = require('mongoose');
const { passHash, comparePasswords } = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String
  },
  profilePhotoUrl: {
    type: String
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

userSchema.pre('save', function(next){
  passHash(this._tempPassword)
    .then(hashPassword => {
      this.passwordHash = hashPassword;    
      next();
    });
});

userSchema.methods.compare = function(password) {
  return comparePasswords(password, this.passwordHash);
};

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};

const User = mongoose.model('User', userSchema);

module.exports = User;
