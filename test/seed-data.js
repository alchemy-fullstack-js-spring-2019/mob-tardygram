const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

module.exports = async({
  userCount = 20,
  postCount = 200,
} = {}) => {
  const users = [...Array(userCount)]
    .map(() => ({
      username: chance.name(),
      password: chance.string({ length: 10, pool: 'abcdefghijklmnopqrstuvwxyz' })
    }));

  const createdUsers = await User.create(users);
  const posts = [...Array(postCount)]
    .map(() => ({
      user: chance.pickone(createdUsers)._id,
      photoUrl: chance.url(),
      caption: chance.sentence({ words: 5 }),
      hashtags: [chance.word({ length: 5 }), chance.word({ length: 5 }), chance.word({ length: 5 })]
    }));
  const createdPosts = await Post.create(posts);
  return [createdUsers, createdPosts];
};
