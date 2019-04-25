require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
// const { getUser, getUsers } = require('../data/dataHelpers');
const Post = require('../../lib/models/Post');
const connect = require('../../lib/utils/connect');

describe('POST ROUTES', () => {

  beforeAll(() => {
    return connect();
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  // beforeEach(() => {
  //   return seedData();
  // });
  
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
    // return getUser()
    //   .then(user => {
    //     console.log('**', user);
    //     return request(app)
    // .post('/instantgram/posts')
    // .send({
    //   user: user._id,
    //   photoUrl: 'photo'
    // })
    //       .then(res => {
    //         expect(res.body).toEqual({
    //           _id: expect.any(String),
    //           user: expect.any(String), // maybe?!
    //           photoUrl: 'photo',
    //           tags: [],
    //           __v: 0
    //         });
    //       });
    //   });
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
          .then(post => {
            return request(app)
              .get(`/instantgram/posts/${post.body.user}`)
              .then(res => {
                expect(res.body).toEqual({
                  __v: 0,
                  _id: expect.any(String),
                  photoUrl: 'photo',
                  tags: [],
                  user: user.body.user._id
                });
              });
          });
      });
      
  });


});
