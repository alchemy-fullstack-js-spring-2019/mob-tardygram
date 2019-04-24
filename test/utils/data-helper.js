require('dotenv').config();
const seedData = require('./seed-data');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedData();
});

afterAll(() => {
  return mongoose.connection.close();
});
