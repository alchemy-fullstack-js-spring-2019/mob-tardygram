require('dotenv').config();
const mongoose = require('mongoose');
const seedData = require('./seed-data');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');

beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedData();
});

let token = null;
beforeEach(() => {
  return User.create({
    username: 'Test Person',
    password: 'password'
  })
    .then(user => {
      return request(app)
        .post('/api/v1/auth/signin')
        .send({
          username: user.username,
          password: 'password'
        });
    })
    .then(res => {
      token = res.body.token;
    });
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
  ...createGetters(Comment),
  getToken: () => token
};
