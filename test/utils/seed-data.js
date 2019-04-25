const chance = require('chance').Chance();
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');

module.exports = ({ 
  userCount = 10,
  postCount = 100
} = {}) => {
  const users = [...Array(userCount)].map(() => ({
    username: chance.name(),
    password: chance.radio(),
    profilePhotoUrl: 'image.jpg'
  }));

  
  return User
    .create(users)
    .then(createdUsers => {
      const posts = [...Array(postCount)].map(() => ({
        user: chance.pickone(createdUsers)._id,
        photoUrl: 'image.jpg',
        caption: chance.sentence(),
        tags: [chance.animal(), chance.company(), chance.color()]
      }));
      return Post.create(posts);
    });
};
