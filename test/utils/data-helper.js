require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

beforeAll(() => {
  return connect();
});

beforeEach(() => {
  mongoose.connection.dropDatabase();
});

afterAll(() => {
  return mongoose.connection.close();
});
