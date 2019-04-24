require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const User = require('../../lib/models/User');
const app = require('../../lib/app');

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
        username: 'Flavender',
        password: 'letmein',
        profilePhotoUrl: 'https://picture.com/profile.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            username: 'Flavender',
            profilePhotoUrl: 'https://picture.com/profile.jpg'
          },
          token: expect.any(String)
        });
      });
  });
});
