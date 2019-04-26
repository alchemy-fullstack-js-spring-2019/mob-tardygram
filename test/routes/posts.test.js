const request = require('supertest');
const app = require('../../lib/app');
const { getUser, getPosts, getPost, getToken } = require('../data-helpers');

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

  it('can get a post by id', () => {
    return getPost()
      .then(post => {
        return Promise.all([
          Promise.resolve(post),
          request(app)
            .get(`/api/v1/posts/${post._id}`) 
        ]);
      })
      .then(([post, res]) => {
        expect(res.body).toEqual({
          _id: post._id.toString(),
          photoUrl: post.photoUrl,
          user: post.user,
          caption: post.caption,
          tags: post.tags,
          comments: expect.any(Array)
        });
      });
  });
  it('can update the caption of a post', async() => {
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
      .then(createdPost => {
        return request(app)
          .patch(`/api/v1/posts/${createdPost.body._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ caption: 'new caption' });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          photoUrl: expect.any(String),
          caption: 'new caption',
          tags: [],
          _id: expect.any(String)
        });
      });
  });

  it('deletes a post', async() => {
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
      .then(createdPost => {
        return request(app)
          .delete(`/api/v1/posts/${createdPost.body._id}`)
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          photoUrl: expect.any(String),
          caption: expect.any(String),
          tags: [],
          _id: expect.any(String)
        });
      });
  });
});
