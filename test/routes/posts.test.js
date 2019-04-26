const { getUser } = require('../data-helpers');
const Post = require('../../lib/models/Post');
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
  
  let testUser, testUserPosts, token;
  beforeEach(async() => {
    testUser = await getUser();
    testUserPosts = await Post.find({ user: testUser._id });
    const actualTestUser = await User.findOne({ _id: testUser._id });
    token = actualTestUser.authToken();
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

    expect(posts.body).toHaveLength(51);
  });
  it.only('gets a post by id', async() => {
    const id = userPost.body._id;
    const post = await request(app)
      .get(`/api/v1/posts/${id}`);
    expect(post.body).toEqual({
      user: {
        _id: expect.any(String),
        profilePhotoUrl: expect.any(String),
        username: 'intro_mode'
      },
      photoUrl: 'cutephotohere',
      caption: 'cutecaptionhere',
      hashtags: ['omg', 'wow'],
      __v: 0,
      _id: expect.any(String),
      //comments: expect.any(Array)
    });
  });
  it('updates a post', async() => {
    const updatedPost = await request(app)
      .patch(`/api/v1/posts/${testUserPosts[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        photoUrl: 'dont use me',
        caption: 'uglycaptionhere',
      });
    expect(updatedPost.body).toEqual({
      user: expect.anything(),
      photoUrl: testUserPosts[0].photoUrl,
      caption: 'uglycaptionhere',
      hashtags: [testUserPosts[0].hashtags[0], testUserPosts[0].hashtags[1], testUserPosts[0].hashtags[2]],
      __v: 0,
      _id: testUserPosts[0]._id.toString()
    });
  });
});
