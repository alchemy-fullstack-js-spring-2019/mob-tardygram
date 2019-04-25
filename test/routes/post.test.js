require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const User = require('../../lib/models/User');
const Post = require('../../lib/models/Post');
const { getUser, getPosts, getPost } = require('../utils/data-helper');

describe('post routes', () => {
  it.only('makes new post', () => {
    return Promise.all([
      getUser(),
      getPost()
    ])
      .then(([user, post])=> {
        return request(app)
          .post('/api/v1/posts')
          .send({ 
            user: user._id,
            photoUrl: post.photoUrl,
            caption: post.caption,
            tags: post.tags
          });
      })
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({
          user: expect.any(String),
          photoUrl: expect.any(String),
          caption: expect.any(String),
          tags: expect.any(Array),
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('GET all posts', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'billy', password: 'billyJowell' })
      .then(res => {
        return request(app)
          .post('/api/v1/posts')
          .send({
            user: res.body.user._id,
            photoUrl: 'http://url.com',
            caption: 'my cool pic',
            tags: ['tag']
          })
          .then(() => {
            return request(app)
              .get('/api/v1/posts');
          })
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });
});

// return request(app)
//           .post('/api/v1/posts')
//           .send({
//             user: user.body.user._id,
//             photoUrl: 'http://url.com',
//             caption: 'my cool pic',
//             tags: ['tag']
//           })
//           .then(res => {
//             expect(res.body).toEqual({
//               _id: expect.any(String),
//               __v: 0,
//               user: expect.any(String),
//               photoUrl: 'http://url.com',
//         caption: 'my cool pic',
//         tags: ['tag']
//       });
//     });
  
// });
