const chance = require('chance').Chance();
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');

function seedUsers(userCount = 20) {
  const users = [...Array(userCount)].map(()=> ({
    username: chance.animal(),
    password: chance.string()
  }));
  return User.create(users);
}

function seedPosts(userCount = 20) {
  return seedUsers()
    .then(users => {
      const posts = [...Array(userCount)].map(() => ({
        user: chance.pickone(users)._id,
        photoUrl: chance.url(),
        caption: chance.sentence(),
        tags: chance.hashtag()
      }));
      return Post.create(posts);
    });
}

module.exports = {
  seedUsers,
  seedPosts
};
