require('dotenv').config();
const seedData = require('./seed-data');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');

beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

const agent = request.agent(app);
beforeEach(() => {
  return agent
    .post('/api/v1/auth/signup')
    .send({ username: 'alchemist', password: 'homework' });
});

beforeEach(() => {
  return seedData();
});

afterAll(() => {
  return mongoose.connection.close();
});
