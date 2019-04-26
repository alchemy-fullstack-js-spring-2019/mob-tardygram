require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
const seedData = require('../data/seed-data');

describe('aggregation tests', () => {

  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return seedData();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('get the 10 posts with the most comments', () =>{
    return request(app)
      .get('/instantgram/posts/popular')
      .then(res => {
        expect(res.body).toHaveLength(10);
      });
  });
});
