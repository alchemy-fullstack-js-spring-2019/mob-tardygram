const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 20
  },
  passwordHash: String,
  profilePhotoUrl: String
});

module.exports = mongoose.model('User', userSchema);
