require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');
const { getUser, getPosts, getPost } = require('../utils/data-helper');

describe('post routes', () => {
  it('makes new post', () => {
    return Promise.all([
      getUser(),
      getPost()
    ])
      .then(([user, post])=> {
        return request(app)
          .post('/api/v1/posts')
          .send({ 
            user: user._id,
            photoUrl: post.photoUrl,
            caption: post.caption,
            tags: post.tags
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
});

