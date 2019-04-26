require('../connect-db');
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');

describe('auth routes', () => {
  it('can sign up a user', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'is it this one',
        password: 'youllneverguess'
      });
    expect(response.body).toEqual({
      user: {
        username: 'is it this one',
        _id: expect.any(String),
        profilePhotoUrl: expect.any(String)
      },
      token: expect.any(String)
    });
  });

  it('can sign in a user', async() => {
    await User.create({
      username: 'is it this one',
      password: 'youllneverguess'
    });
    const response = await request(app)
      .post('/api/v1/auth/signin')
      .send({
        username: 'is it this one',
        password: 'youllneverguess'
      });

    expect(response.body).toEqual({
      user: {
        username: 'is it this one',
        _id: expect.any(String),
        profilePhotoUrl: expect.any(String)
      },
      token: expect.any(String)
    });
  });
});
