const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');

module.exports = async({
  userCount = 10,
  postCount = 50,
  commentCount = 100

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


  const comments = [...Array(commentCount)]
    .map(()=>({
      commentBy: chance.pickone(createdUsers)._id,
      post: chance.pickone(createdPosts)._id,
      comment: chance.sentence({ words:8 })
    }));
  const createdComments = await Comment.create(comments);

  return [createdUsers, createdPosts, createdComments];
};
