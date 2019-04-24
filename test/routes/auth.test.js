require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');
require('../data-helpers');

describe('auth routes', () => {
  it('signs up a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'Jeff',
        password: 'secret',
        profilePhoto: 'pic.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            username: 'Jeff',
            profilePhoto: 'pic.jpg'
          },
          token: expect.any(String)
        });
      });
  });

  it('can sign in a user', () => {
    return User.create({
      username: 'Jeff',
      password: 'secret'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            username: 'Jeff',
            password: 'secret'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            username: 'Jeff'
          },
          token: expect.any(String)
        });
      });
  });
});

