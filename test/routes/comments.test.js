const app = require('../../lib/app');
const request = require('supertest');
const { getPost, getToken, getComment } = require('../dataHelpers');
// const { tokenize } = require('../../lib/utils/token');

describe('comment route', () => {
  it('creates a comment', async() => {
    const post = await getPost();
    const token = await getToken();
    const res = await request(app)
      .post('/api/v1/comments')
      .set('authorization', `Bearer ${token}`)
      .send({
        comment: 'this is a mothafuckin comment',
        post: post._id
      });
    expect(res.body).toEqual({
      comment: 'this is a mothafuckin comment',
      post: post._id,
      _id: expect.any(String),
      commentBy: expect.any(String)
    });
  });

  it('deletes a comment by id', async() => {
    const comment = await getComment();
    const token = await getToken({ _id: comment.commentBy });
    const res = await request(app)
      .delete(`/api/v1/comments/${comment._id}`)
      .set('authorization', `Bearer ${token}`);
    
    expect(res.body).toEqual(comment);
  });
});
