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

  it('can delete a comment by id', async() => {
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
      .then(createdComment => {
        return request(app)
          .delete(`/api/v1/comments/${createdComment.body._id}`)
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          commentBy: expect.any(String),
          post: expect.any(String),
          comment: 'hola',
          _id: expect.any(String)
        });
      });
  });
});
