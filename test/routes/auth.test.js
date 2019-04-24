require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const User = require('../../lib/models/User');

describe('auth routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('signs up a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'funky',
        password: 'password',
        profilePhotoUrl: 'string.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            username: 'funky',
            profilePhotoUrl: 'string.jpg',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });
});
