const chance = require('chance').Chance();
const User = require('../../lib/models/User');

module.exports = ({
  userCount = 10,
  // postCount = 25,
  // commentCount = 50,

} = {}) => {
  const users = [...Array(userCount)]
    .map(() => ({
      username: chance.name(),
      passwordHash: chance.hash(20),
      profilePhotoUrl: chance.url(),
    }));
  return User.create(users);
};
