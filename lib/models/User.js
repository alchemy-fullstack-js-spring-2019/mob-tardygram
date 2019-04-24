const mongoose = require('mongoose');

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
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
