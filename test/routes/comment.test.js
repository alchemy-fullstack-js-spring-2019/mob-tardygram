require('dotenv').config();
const chance = require('chance').Chance();
const request = require('supertest');
const app = require('../../lib/app');
const { getUser, getPost, getToken } = require('../utils/data-helper');

describe('comment routes', () => {

  it('creates a comment', () => {
    return getUser({ username: 'person0' })
      .then(user=> {
        return request(app)
          .post('/api/v1/posts')
          .set('Authorization', `Bearer ${getToken()}`)
          .send({ 
            user: user._id,
            photoUrl: chance.url(),
            caption: chance.string(),
            tags: [chance.string()]
          });
      })
      .then(post => {
        return request(app)
          .post('/api/v1/comments')
          .set('Authorization', `Bearer ${getToken()}`)
          .send({
            commentBy: post.user,
            post: post._id,
            comment: 'this is my cool comment'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          commentBy: expect.any(String),
          post: expect.any(String),
          comment: 'this is my cool comment'
        });
      });
  });


  
});
