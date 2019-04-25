require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seed-data');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

beforeAll(() => {
  return connect();
});
beforeEach(() => {
  return mongoose.connection.dropDatabase();
});
beforeEach(async() => {
  await seedData();
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = model => JSON.parse(JSON.stringify(model));

const createGetters = Model => {
  return {
    [`get${Model.modelName}`]: query => Model.findOne(query).then(prepare),
    [`get${Model.modelName}s`]: query => Model.find(query).then(models => models.map(prepare))
  };
};

module.exports = {
  ...createGetters(User),
  ...createGetters(Post),
};
