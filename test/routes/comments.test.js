require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');
// const Comment = require('../../lib/models/User');

describe('routes work for comments', () => {
  beforeAll(() => {
    return connect();
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('posts a comment to a post', () => {
    return request(app)
      .post('/instantgram/auth/signup')
      .send({
        username: 'benji',
        password: 'forkknife'
      })
      .then(user => {
        return request(app)
          .post('/instantgram/posts')
          .send({
            user: user.body.user._id,
            photoUrl: 'photo'
          })
          .then(post => {
            return request(app)
              .post('/instantgram/comments')
              .send({
                commentBy: post.body.user,
                post: post.body._id,
                comment: 'fun little comment'
              })
              .then(comment => {
                expect(comment.body).toEqual({
                  commentBy: post.body.user,
                  post: post.body._id,
                  comment: 'fun little comment',
                  _id: expect.any(String),
                  __v: 0
                });
              });
          });
      }); 
  });
  it('gets a list of comment', () => {
    return request(app)
      .post('/instantgram/auth/signup')
      .send({
        username: 'benji',
        password: 'forkknife'
      })
      .then(user => {
        return request(app)
          .post('/instantgram/posts')
          .send({
            user: user.body.user._id,
            photoUrl: 'photo'
          })
          .then(post => {
            return request(app)
              .post('/instantgram/comments')
              .send({
                commentBy: post.body.user,
                post: post.body._id,
                comment: 'fun little comment'
              })
              .then(comment => {
                return request(app)
                  .delete(`/instantgram/comments/${comment.body._id}`)
                  .then(deletedRes => {
                    expect(deletedRes.body).toEqual(comment.body);
                  });
              });
          });
      }); 
  });
});
