const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Thread = require('../lib/models/Thread');
const Comment = require('../lib/models/Comment');

module.exports = ({
  userCount = 5,
  threadCount = 30,
  commentCount = 25
} = {}) => {
  const userStorage = [...Array(userCount)].map(() => ({
    username: chance.name(),
    profilePhoto: chance.string({ length: 5 }),
    password: chance.string({ length: 13 })
  }));

  return User
    .create(userStorage)
    .then(createdUsers => {
      const threadStorage = [...Array(threadCount)].map(() => ({
        username: chance.pickone(createdUsers)._id,
        photoUrl: chance.string({ length: 7 }),
        caption: chance.string({ length: 100 }),
        hashtags: [chance.string({ length: 10 }), chance.string({ length: 10 })]
      }));

      return Promise.all([
        Promise.resolve(createdUsers),
        Thread.create(threadStorage)
      ])  
        .then(([createdUsers, createdThreads]) => {
          const commentStorage = [...Array(commentCount)].map(() => ({
            username: chance.pickone(createdUsers)._id,
            thread: chance.pickone(createdThreads)._id,
            body: chance.string({ length: 100 })
          }));
          return Promise.all([
            Promise.resolve(createdUsers),
            Promise.resolve(createdThreads),
            Comment.create(commentStorage)
          ]);
        });
    });
};
