const chance = require('chance').Chance();
const User = require('../../lib/models/User');
// const Post = require('../../lib/models/Post');

module.exports = ({ 
  userCount = 10,
  // postCount = 100
} = {}) => {
  const users = [...Array(userCount)].map(() => ({
    username: chance.name(),
    password: chance.radio(),
    profilePhotoUrl: 'image.jpg'
  }));

  return User.create(users);
};
