require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const connect = require('../../lib/utils/connect');

describe('POST ROUTES', () => {

  beforeAll(() => {
    return connect();
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts posts', () => {
    return request(app)
      .post('/instantgram/auth/signup')
      .send({
        username: 'fine',
        password: 'password'
      })
      .then(user => {
        return request(app)
          .post('/instantgram/posts')
          .send({
            user: user.body.user._id,
            photoUrl: 'photo'
          })
          .set('Authorization', `Bearer ${user.body.token}`)
          .then(post => {
            expect(post.body).toEqual({
              __v: 0,
              _id: expect.any(String),
              photoUrl: 'photo',
              tags: [],
              user: user.body.user._id 
            });
          });
      
      });
  });

  it('gets a list of posts', () => {
    return request(app)
      .post('/instantgram/auth/signup')
      .send({
        username: 'notfine',
        password: 'password'
      })
      .then(user => {
        return request(app)
          .post('/instantgram/posts')
          .send({
            user: user.body.user._id,
            photoUrl: 'photo'
          })
          .set('Authorization', `Bearer ${user.body.token}`)
          .then(() => {
            return request(app)
              .get('/instantgram/posts')
              .then(res => {
                expect(res.body).toHaveLength(1);
              });
          });
      });
  });

  it('gets a post by id', () => {
    return request(app)
      .post('/instantgram/auth/signup')
      .send({
        username: 'notfine',
        password: 'password'
      })
      .then(user => {
        return request(app)
          .post('/instantgram/posts')
          .send({
            user: user.body.user._id,
            photoUrl: 'photo'
          })
          .set('Authorization', `Bearer ${user.body.token}`)
          .then(post => {
            return request(app)
              .get(`/instantgram/posts/${post.body._id}`)
              .then(res => {
                expect(res.body).toEqual({
                  comments: [],
                  post: {
                    __v: 0,
                    _id: post.body._id,
                    photoUrl: 'photo',
                    tags: [],
                    user: user.body.user._id
                  }
                });
              });
          });
      });
  });
  it('patches a post', () => {
    return request(app)
      .post('/instantgram/auth/signup')
      .send({
        username: 'notfine',
        password: 'password'
      })
      .then(user => {
        return request(app)
          .post('/instantgram/posts')
          .send({
            user: user.body.user._id,
            photoUrl: 'photo',
            caption: 'words'
          })
          .set('Authorization', `Bearer ${user.body.token}`)
          .then(post => {
            return request(app)
              .patch(`/instantgram/posts/${post.body._id}`)
              .send({ caption: 'updated' })
              .set('Authorization', `Bearer ${user.body.token}`)
              .then(res => {
                expect(res.body).toEqual({
                  user: user.body.user._id,
                  _id: post.body._id,
                  photoUrl: 'photo',
                  caption: 'words',
                  tags: []
                });
              });
          });
      });
  });
  it('can delete a post', () => {
    return request(app)
      .post('/instantgram/auth/signup')
      .send({
        username: 'notfine',
        password: 'password'
      })
      .then(user => {
        return request(app)
          .post('/instantgram/posts')
          .send({
            user: user.body.user._id,
            photoUrl: 'photo'
          })
          .set('Authorization', `Bearer ${user.body.token}`)
          .then(post => {
            return request(app)
              .delete(`/instantgram/posts/${post.body._id}`)
              .set('Authorization', `Bearer ${user.body.token}`)
              .then(deletedPost => {
                expect(deletedPost.body).toEqual(post.body);
              });
          });
      });
  });

  it('post by id with comments', () => {
    return request(app)
      .post('/instantgram/auth/signup')
      .send({
        username: 'username',
        password: 'password'
      })
      .then(user => {
        return request(app)
          .post('/instantgram/posts')
          .send({
            user: user.body.user._id,
            photoUrl: 'photo'
          })
          .set('Authorization', `Bearer ${user.body.token}`)
          .then(post => {
            return request(app)
              .post('/instantgram/comments')
              .send({
                comment: 'sassy',
                post: post.body._id,
                commentBy: post.body.user
              })
              .set('Authorization', `Bearer ${user.body.token}`)
              .then(comment => {
                return request(app)
                  .get(`/instantgram/posts/${comment.body.post}`)
                  .then(foundPost => {
                    expect(foundPost.body).toEqual({
                      comments: [{
                        _id: expect.any(String),
                        comment: 'sassy',
                        commentBy: post.body.user
                      }],
                      post: {
                        __v: 0,
                        _id: post.body._id,
                        user: user.body.user._id,
                        photoUrl: 'photo',
                        tags: []
                      }
                    });
                  });
              });
          });
      });
  });

});
