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

  it('signup a new user', () => {
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

  it('verifies a user', () => {
    return request(app)
      .post('/instantgram/auth/signup')
      .send({ username: 'DMV', password: 'dmv' })
      .then(user => {
        return request(app)
          .get('/instantgram/auth/verify')
          .set('Authorization', `Bearer ${user.body.token}`)
          .then(result => {
            expect(result.body).toEqual({
              _id: expect.any(String),
              username: 'DMV',
            });
          });
      });
  });


});
