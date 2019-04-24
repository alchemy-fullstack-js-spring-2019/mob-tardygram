const request = require('supertest');
const app = require('../../lib/app');
const { getUser } = require('../data-helpers');
const connect = require('../../lib/utils/connect');


describe('post routes', () => {
  
  it('can create a new post', () => {
    return getUser()
      .then(user => {
        return request(app)
          .post('/api/v1/posts')
          .send({
            user: user._id,
            photoUrl: 'string.jpg',
            caption: 'word'
          });
      })
      .then(post => {
        expect(post.body).toEqual({
          user: expect.any(String),
          photoUrl: 'string.jpg',
          caption: 'word',
          __v: 0,
          tags: [],
          _id: expect.any(String)
        });
      });
  });
});
