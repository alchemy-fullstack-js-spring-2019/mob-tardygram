const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

function seedUsers(userCount = 5) {
  const users = [...Array(userCount)].map(() => ({
    username: chance.name(),
    password: chance.radio(),
    profilePhotoUrl: chance.avatar()
  }));

  return User.create(users);
}

function seedPosts(postCount = 20) {
  return seedUsers().then(users => {
    const posts = [...Array(postCount)].map(() => ({
      user: chance.pickone(users)._id,
      photoUrl: chance.avatar(),
      caption: chance.cpf(),
      tags: [
        chance.hashtag(),
        chance.animal(),
        chance.color()
      ]
    }));
    return Post.create(posts);
  });
}

module.exports = seedPosts;
