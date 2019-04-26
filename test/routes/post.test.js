require('dotenv').config();
const chance = require('chance').Chance();
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');
const { getUser, getPosts, getPost, getToken } = require('../utils/data-helper');

describe('post routes', () => {

  it('makes new post', () => {
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
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          photoUrl: expect.any(String),
          caption: expect.any(String),
          tags: expect.any(Array),
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('GETs all posts', () => {
    return request(app)
      .get('/api/v1/posts')
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });

  it('gets a post by id', () => {
    return getPost()
      .then(post => {
        return request(app)
          .get(`/api/v1/posts/${post._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: expect.any(String),
          photoUrl: expect.any(String),
          caption: expect.any(String),
          tags: expect.any(Array)
        });
      });
  });

  it('updates post by id', () => {
    return getUser({ username: 'person0' })
      .then(user => {
        return getPost()
          .then(post => {
            return request(app)
              .patch(`/api/v1/posts/${post._id}`)
              .set('Authorization', `Bearer ${getToken()}`)
              .send({ caption: 'updated caption yo!!!!' });
          });

      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: expect.any(String),
          photoUrl: expect.any(String),
          caption: 'updated caption yo!!!!',
          tags: expect.any(Array)
        });
      });
  });

  // it('deletes a post by id', () => {
  //   return getPost()
  //     .then();
  // });

});

