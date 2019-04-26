const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');

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

async function seedComments(commentCount = 100) {
  const posts = await seedPosts();
  const users = await seedUsers();
  const comments = [...Array(commentCount)].map(() => ({
    commentBy: chance.pickone(users)._id,
    post: chance.pickone(posts)._id,
    comment: chance.sentence()
  }));
  return Comment.create(comments);
}

module.exports = seedComments;
