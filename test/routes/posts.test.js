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

  it('can get a list of posts', () => {
    return request(app)
      .get('/api/v1/posts')
      .then(res => {
        expect(res.body).toHaveLength(20);
      });
  });
});
