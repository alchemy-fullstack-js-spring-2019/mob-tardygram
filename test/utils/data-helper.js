require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');
const { seedUsers, seedPosts } = require('./seed-data');
const app = require('../../lib/app');
const request = require('supertest');

beforeAll(() => {
  return connect();
});
beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedUsers();
});
beforeEach(() => {
  return seedPosts();
});

let token = '';
beforeEach(() => {
  return User.findOne({ username: 'person0' })
    .then(user => {
      return request(app)
        .post('/api/v1/auth/signin')
        .send({ username: user.username, password: 'secretword' });
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
  getToken: () => token
};
