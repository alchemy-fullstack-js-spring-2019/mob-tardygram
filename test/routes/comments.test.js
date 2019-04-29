require('dotenv').config();
const request = require('supertest');
require('../utils/data-helper');
const app = require('../../lib/app');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');
// const Comment = require('../../lib/models/Comment');

describe('comment routes', () => {
  it('posts a comment', () => {
    return Promise.all([
      User.findOne({ username: 'alchemist' }),
      Post.findOne()
    ])
      .then(([user, post]) => {
        return request(app)
          .post('/api/v1/comments')
          .set('Authorization', `Bearer ${user.authToken()}`)
          .send({
            commentBy: user._id,
            post: post._id,
            comment: 'rockin pic bud'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          commentBy: expect.any(String),
          post: expect.any(String),
          comment: 'rockin pic bud',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
