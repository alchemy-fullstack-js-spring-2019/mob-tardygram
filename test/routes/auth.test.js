require('../connect-db');
const request = require('supertest');
const app = require('../../lib/app');

describe('auth routes', () => {
  it('can sign up a user', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'intro_mode',
        password: 'youllneverguess'
      });
    expect(response.body).toEqual({
      user: {
        username: 'intro_mode',
        _id: expect.any(String),
        profilePhotoUrl: expect.any(String)
      },
      token: expect.any(String)
    });
  });
});
