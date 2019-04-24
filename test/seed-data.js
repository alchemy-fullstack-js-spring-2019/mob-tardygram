const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

module.exports = ({ userCount = 5, postCount = 100 } = {}) => {
  const users = [...Array(userCount)].map(() => ({
    username: chance.name(),
    profilePhotoUrl: chance.url(),
    password: chance.animal()
  }));

  return User.create(users)
    .then(createdUsers => {
      const posts = [...Array(postCount)].map(() => ({
        user: chance.pickone(createdUsers)._id,
        photoUrl: chance.url(),
        caption: chance.string(),
        tags: [chance.word({ length: 6 })]
      }));
      
      return Post.create(posts);
    });
};
