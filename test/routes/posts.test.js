require('../connect-db');
const User = require('../../lib/models/User');
const request = require('supertest');
const app = require('../../lib/app');

describe('posts routes', () => {
  it('test that a user can post', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'intro_mode',
        password: 'youllneverguess'
      });

    const userPost = await request(app)
      .post('/api/v1/posts')
      .set('Authorization', res.body.token)
      .send({
        user: res.body.user._id,
        photoUrl: 'cutephotohere',
        caption: 'cutecaptionhere',
        hashtags: ['omg', 'wow']
      });
    expect(userPost.body).toEqual({
      user: res.body.user._id,
      photoUrl: 'cutephotohere',
      caption: 'cutecaptionhere',
      hashtags: ['omg', 'wow'],
      __v: 0,
      _id: expect.any(String)

    });
  });
});
