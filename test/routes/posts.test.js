const app = require('../../lib/app');
const request = require('supertest');
const { getPost, getToken } = require('../dataHelpers');
const { tokenize } = require('../../lib/utils/token');

describe('post routes', () => {
  it('creates a post', () => {
    return getToken()
      .then(token => {
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

  it('gets a post by id', () => {
    return getPost()
      .then(post => Promise.all([
        Promise.resolve(post),
        request(app)
          .get(`/api/v1/posts/${post._id}`)
      ]))
      .then(([post, res]) => {
        expect(res.body).toEqual({
          _id: post._id,
          tags: post.tags,
          user: {
            _id: post.user,
            username: expect.any(String),
            profilePhotoUrl: expect.any(String)
          },
          comments: expect.any(Array),
          photoUrl: post.photoUrl,
          caption: post.caption,
        });
      });
  });

  it('patches a post by id', () => {
    return getToken()
      .then(token => {
        return Promise.all([
          Promise.resolve(token),
          request(app)
            .post('/api/v1/posts')
            .set('authorization', `Bearer ${token}`)
            .send({
              caption: 'feeling cute might drop out of ACL later',
              photoUrl: 'http://avatar.com'
            })
        ]);
      })
      .then(([token, res]) => {
        return request(app)
          .patch(`/api/v1/posts/${res.body._id}`)
          .set('authorization', `Bearer ${token}`)
          .send({
            caption: 'new caption',
            photoUrl: 'http://avatar222.com'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          caption: 'new caption',
          photoUrl: 'http://avatar.com',
          _id: expect.any(String),
          tags: [],
          user: {
            _id: expect.any(String),
            username: expect.any(String),
            profilePhotoUrl: expect.any(String)
          },
        });
      });
  });

  it('throws error for incorrect token', async() => {
    const token = tokenize({ username: 'FAAKKKEE' });
    const post = await getPost();
    const res = await request(app)
      .patch(`/api/v1/posts/${post._id}`)
      .set('authorization', `Bearer ${token}`)
      .send({
        caption: 'new caption'
      });
    expect(res.body).toEqual({
      error: 'Unauthorized Request'
    });
  });

  it('deletes a post with correct token', async() => {
    const post = await getPost();
    const token = await getToken({ _id: post.user });
    const res = await request(app)
      .delete(`/api/v1/posts/${post._id}`)
      .set('authorization', `Bearer ${token}`);
    expect(res.body).toEqual({
      caption: post.caption,
      photoUrl: post.photoUrl,
      tags: post.tags,
      user: post.user,
      _id: post._id
    });
  });
});
