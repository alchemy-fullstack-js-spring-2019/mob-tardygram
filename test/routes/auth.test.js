require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
// const User = require('../../lib/models/User');

describe.skip('auth routes', () => {
  
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new user', () => {
    return request(app)
      .post('/instantgram/signup')
      .send({ username: 'DMV', password: 'dmv' })
      .then(user => {
        expect(user.body).toEqual({
          user: {
            _id: expect.any(String),
            username: 'DMV',
          },
          token: expect.any(String)
        });
      });
  });
});
