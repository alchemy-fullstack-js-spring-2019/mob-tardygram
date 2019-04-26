require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const seedData = require('./seed-data');
const User = require('../lib/models/User');
const Thread = require('../lib/models/Thread');
const Comment = require('../lib/models/Comment');
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
  return User.findOne()
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

const createGetters = Model => {
  return {
    [`get${Model.modelName}`]: query => Model.findOne(query).then(prepare),
    [`get${Model.modelName}s`]: query => Model.find(query).then(models => models.map(prepare))
  };
};

module.exports = {
  ...createGetters(User),
  ...createGetters(Thread),
  ...createGetters(Comment),
  getToken: () => token
};
