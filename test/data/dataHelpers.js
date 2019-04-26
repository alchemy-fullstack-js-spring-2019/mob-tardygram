require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const seedData = require('./seed-data');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');
const Comment = require('../../lib/models/Comment');

beforeAll(() => {
  return connect();
});

// beforeEach(() => {
//   return mongoose.connection.dropDatabase();
// });

beforeEach(() => {
  return seedData();
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = model => JSON.parse(JSON.stringify(model));

const createGetters = Model => ({
  [`get${Model.modelName}`]: query => Model.findOne(query).then(prepare),
  [`get${Model.modelName}s`]: query => Model.find(query).then(models => models.map(prepare))
});

module.exports = {
  ...createGetters(User),
  ...createGetters(Post),
  ...createGetters(Comment)
};
