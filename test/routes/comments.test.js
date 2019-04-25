const request = require('supertest');
const app = require('../../lib/app');
const { getUser, getPost, getToken } = require('../data-helpers');

describe('comments routes', () => {
  it('can create a new comment', async() => {
    const token = await getToken();
    const user = await getUser();
    const post = await getPost();
    return request(app)
      .post('/api/v1/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        commentBy: user._id,
        post: post._id,
        comment: 'hola'
      })
      .then(res => {
        expect(res.body).toEqual({
          commentBy: expect.any(String),
          post: expect.any(String),
          comment: 'hola',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
