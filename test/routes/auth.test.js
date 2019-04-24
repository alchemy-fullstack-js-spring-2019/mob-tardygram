require('dotenv').config();
const request = require('supertest');
require('../utils/data-helper');
const app = require('../../lib/app');
const User = require('../../lib/models/User');

describe('auth routes', () => {
  it('create new user on sign up, returns user and token', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'anna', password: 'myPAssword', profilePhotoUrl: 'image.jpg' })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            username: 'anna',
            profilePhotoUrl: 'image.jpg',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });
});
