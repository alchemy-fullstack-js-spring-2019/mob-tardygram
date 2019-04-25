const { getUser, getPost, getComment } = require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');
const Comment = require('../../lib/models/Comment');

describe('comments route tests', () => {

  let testUser, testUserPosts, testUserComments, token;
  beforeEach(async() => {
    testUser = await getUser();
    testUserPosts = await Post.find({ user: testUser._id });
    testUserComments = await Comment.find({ commentBy: testUser._id });
    const actualTestUser = await User.findOne({ _id: testUser._id });
    token = actualTestUser.authToken();
  });

  it('can create a comment', async() => {
    const randomPost = await getPost();
    const res = await request(app)
      .post('/api/v1/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        commentBy: testUser._id,
        post: randomPost._id,
        comment: 'so beautiful'
      });

    expect(res.body).toEqual({
      commentBy: expect.any(String),
      post: expect.any(String),
      comment: 'so beautiful',
      _id: expect.any(String),
      __v: 0
    });
  });
  it('can delete a comment', async() => {
    const res = await request(app)
      .delete(`/api/v1/comments/${testUserComments[0]._id}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.body).toEqual({
      commentBy: expect.any(String),
      post: expect.any(String),
      comment: expect.any(String),
      _id: expect.any(String),
      __v: 0
    });
      
  });

});
