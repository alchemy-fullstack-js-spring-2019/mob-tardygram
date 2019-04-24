const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: String,
  profilePhotoUrl: String
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

module.exports = mongoose.model('User', userSchema);
