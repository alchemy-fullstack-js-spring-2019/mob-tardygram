const mongoose = require('mongoose');
const { hashFn, compare } = require('../utils/hash');

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

module.exports = mongoose.model('User', userSchema);
