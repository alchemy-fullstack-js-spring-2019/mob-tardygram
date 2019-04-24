require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');

describe('post routes', () => {
  beforeAll(() => {
    return connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('makes new post', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'billy', password: 'billyJowell' })
      .then(res => {
        return request(app)
          .post('/api/v1/posts')
          .send({
            user: res.body.user._id,
            photoUrl: 'http://url.com',
            caption: 'my cool pic',
            tags: ['tag']
          })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              __v: 0,
              user: expect.any(String),
              photoUrl: 'http://url.com',
              caption: 'my cool pic',
              tags: ['tag']
            });
          });
  
      });
  });
});
