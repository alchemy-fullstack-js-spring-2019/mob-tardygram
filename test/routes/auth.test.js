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
    mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can sign up a new user via POST', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'Beezer',
        password: 'snorky'
      })
      .then(user => {
        expect(user.body).toEqual({
          user: {
            username: 'Beezer',
            _id: expect.any(String)
          },
          token: expect.any(String)
        });
      });
  });

  it('test sign in user', () => {
    return User.create({
      username: 'MagicFrank',
      password: 'unhackable'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            username: 'MagicFrank',
            password: 'unhackable'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            _id: expect.any(String),
            username: 'MagicFrank'
          },
          token: expect.any(String)
        });
      });
  });
});
