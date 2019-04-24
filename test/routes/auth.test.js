require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
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

  it('creates a new user', () => {
    return request(app)
      .post('/instantgram/auth/signup')
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

  it('signs in a user', () => {
    return User.create({ username: 'username', password: 'ughk' })
      .then(() => {
        return request(app)
          .post('/instantgram/auth/signin')
          .send({ username: 'username', password: 'ughk' })
          .then(result => {
            expect(result.body).toEqual({ 
              user: {
                _id: expect.any(String),
                username: 'username',
              },
              token: expect.any(String)
            });
          });
      });
  });
});
