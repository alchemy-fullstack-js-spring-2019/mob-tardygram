require('../connect-db');
const User = require('../../lib/models/User');
const request = require('supertest');
const app = require('../../lib/app');

describe('posts routes', () => {
  let res;
  let userPost;
  beforeEach(async() => {
    res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'intro_mode',
        password: 'youllneverguess'
      });

    userPost = await request(app)
      .post('/api/v1/posts')
      .set('Authorization', res.body.token)
      .send({
        user: res.body.user._id,
        photoUrl: 'cutephotohere',
        caption: 'cutecaptionhere',
        hashtags: ['omg', 'wow']
      });
  });
  

  it('test that a user can post', async() => {
    expect(userPost.body).toEqual({
      user: res.body.user._id,
      photoUrl: 'cutephotohere',
      caption: 'cutecaptionhere',
      hashtags: ['omg', 'wow'],
      __v: 0,
      _id: expect.any(String)

    });
  });
  it('gets a list of all posts', async() => {
    const posts = await request(app)
      .get('/api/v1/posts');

    expect(posts.body).toHaveLength(1);
  });
  it('gets a post by id', async() => {
    const id = userPost.body._id;
    const post = await request(app)
      .get(`/api/v1/posts/${id}`);
    expect(post.body).toEqual({
      user: res.body.user._id,
      photoUrl: 'cutephotohere',
      caption: 'cutecaptionhere',
      hashtags: ['omg', 'wow'],
      __v: 0,
      _id: expect.any(String)
    });
  });
});
