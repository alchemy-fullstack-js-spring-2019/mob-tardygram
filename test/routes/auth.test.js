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

  it('compares user on sign in, returns user and token', () => {
    return User.create({
      username: 'anna',
      password: 'pw1234',
      profilePhotoUrl: 'image.jpg'
    })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({
            username: 'anna',
            password: 'pw1234',
            profilePhotoUrl: 'image.jpg'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            username: 'anna',
            _id: expect.any(String),
            profilePhotoUrl: 'image.jpg'
          },
          token: expect.any(String)
        });
      });
  });

  it('can verify a user', () => {
    return User
      .create({ username: 'face', password: 'yourmom' })
      .then(() => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({ username: 'face', password: 'yourmom' });
      })
      .then(res => {
        return request(app)
          .get('/api/v1/auth/verify')
          .set('Authorization', `Bearer ${res.body.token}`);
      })
      .then(res => {
        expect(res.body).toEqual({ username: 'face', _id: expect.any(String) });
      });
  });
});
