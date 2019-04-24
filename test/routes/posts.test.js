const app = require('../../lib/app');
const request = require('supertest');
const { getUser, getPost } = require('../dataHelpers');


describe('post routes', () => {
  it('creates a post', () => {
    return getUser()
      .then(user => {
        const token = user.authToken();
        return request(app)
          .post('/api/v1/posts')
          .set('authorization', `Bearer ${token}`)
          .send({
            caption: 'feeling cute might drop out of ACL later',
            photoUrl: 'http://avatar.com'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          caption: 'feeling cute might drop out of ACL later',
          photoUrl: 'http://avatar.com',
          _id: expect.any(String),
          tags: []
        });
      });
  });
});
