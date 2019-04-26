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
  it('signs in a user', () => {
    return User.create({
      username: 'Flavender',
      password: 'letmein',
      profilePhotoUrl: 'https://picture.com/profile.jpg'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            username: 'Flavender',
            password: 'letmein'
          });
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

  it('errors signin on a bad password', () => {
    return User.create({
      username: 'Flavender',
      password: 'letmein',
      profilePhotoUrl: 'https://picture.com/profile.jpg'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            username: 'Flavender',
            password: 'dontletmein'
          });
      })
      .then(res => {
        expect(res.body.error).toEqual('Invalid authentication');
      });
  });
  it('it errors if user doesn\'t exist', () => {
    return request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'Flavender',
        password: 'dontletmein'
      })
      .then(res => {
        expect(res.body.error).toEqual('Invalid authentication');
      });
  });
  it('verify user', () => {
    return User.create({
      username: 'Flavender',
      password: 'letmein',
      profilePhotoUrl: 'https://picture.com/profile.jpg'
    })
      .then(user => {
        const token = user.authToken();
        return request(app)
          .get('/api/v1/auth/verify')
          .set('authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'Flavender',
          profilePhotoUrl: 'https://picture.com/profile.jpg'
        });
      });
  });
});
