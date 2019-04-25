require('dotenv').config();
// const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const { getUser, /*getUsers*/ } = require('../data/dataHelpers');
// const Post = require('../../lib/models/Post');
// const connect = require('../../lib/utils/connect');

describe.skip('POST ROUTES', () => {
  it('posts posts', () => {
    return getUser()
      .then(user => {
        return request(app)
          .post('/instantgram/posts')
          .send({
            user: user._id,
            photoUrl: 'photo'
          })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              user: expect.any(String), // maybe?!
              photoUrl: 'photo',
              tags: [],
              __v: 0
            });
          });
      });
  });


});
