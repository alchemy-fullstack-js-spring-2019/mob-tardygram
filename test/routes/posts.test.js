require('dotenv').config();
const request = require('supertest');
require('../utils/data-helper');
const app = require('../../lib/app');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');

describe('Post routes', () => {
  it('creates a new post', () => {
    return User.findOne()
      .then(foundUser => {
        return request(app)
          .post('/api/v1/posts')
          .send({
            user: foundUser._id,
            photoUrl: 'image.jpg',
            caption: 'hell yeah',
            tags: ['taylorswift', 'happyfeet', 'releaseevents']
          })
          .then(res => {
            expect(res.body).toEqual({
              user: {
                _id: foundUser._id,
                username: foundUser.username
              },
              photoUrl: 'image.jpg',
              caption: 'hell yeah',
              tags: ['taylorswift', 'happyfeet', 'releaseevents'],
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
});
