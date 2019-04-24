const request = require('supertest');
const app = require('../../lib/app');
const { getUser, getPosts, getToken } = require('../data-helpers');

describe('post routes', () => {
  
  it('can create a new post', async() => {
    const token = await getToken();
    return getUser()
      .then(user => {
        return request(app)
          .post('/api/v1/posts')
          .set('Authorization', `Bearer ${token}`)
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

  it('gets a list of posts', () => {
    return getPosts()
      .then(() => {
        return request(app)
          .get('/api/v1/posts');
      })
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });
});
