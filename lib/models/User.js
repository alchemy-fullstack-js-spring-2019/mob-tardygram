const mongoose = require('mongoose');
const { hash, compare } = require('../../lib/utils/hash');
const { tokenize, untokenize } = require('../../lib/utils/token');

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

userSchema
  .pre('save', function() {
    return hash(this._tempPassword)
      .then(hashed => {
        this.passwordHash = hashed;
      });
  });

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

module.exports = mongoose.model('User', userSchema);
