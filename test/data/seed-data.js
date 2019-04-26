const chance = require('chance').Chance();
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');
const Comment = require('../../lib/models/Comment');

module.exports = ({
  userCount = 10,
  postCount = 25,
  commentCount = 50,

} = {}) => {
  const users = [...Array(userCount)]
    .map(() => ({
      username: chance.name(),
      password: chance.hash(20),
      profilePhotoUrl: chance.url(),
    }));
  return User.create(users)
    .then(createdUsers => {
      const posts = [...Array(postCount)]
        .map(() => ({
          user: chance.pickone(createdUsers)._id,
          photoUrl: chance.url(),
          caption: chance.sentence(),
          tags: [chance.word()]
        }));
      return Promise.all([
        Promise.resolve(createdUsers),
        Post.create(posts)
      ]);
        
    })
    .then(([createdUsers, createdPosts]) => {
      const comments = [...Array(commentCount)]
        .map(() => ({
          commentBy: chance.pickone(createdUsers)._id,
          post: chance.pickone(createdPosts)._id,
          comment: chance.sentence()
        }));
      return Promise.all([
        Promise.resolve(createdUsers),
        Promise.resolve(createdPosts),
        Comment.create(comments)
      ]);
    }); 
};
