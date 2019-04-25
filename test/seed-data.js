const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');

module.exports = ({ userCount = 5, postCount = 100, commentCount = 150 } = {}) => {
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
      return Promise.all([
        createdUsers, 
        Promise.resolve(Post.create(posts))
      ])
        .then(([createdUsers, createdPosts]) => {
          const comments = [...Array(commentCount)].map(() => ({
            commentBy: chance.pickone(createdUsers)._id,
            post: chance.pickone(createdPosts)._id,
            comment: chance.word()
          }));
          return Comment.create(comments);
        });     
    });
};
