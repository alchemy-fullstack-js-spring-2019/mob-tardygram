require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const { getUser, getThread } = require('../data-helpers');

describe('COMMENTS', () => {
  it('creates a new comment - auth required', () => {
    return getUser()
      .then(user => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({ username: user.username, password: 'password' });
      })
      .then(user => {
        return Promise.all([
          Promise.resolve(user),
          request(app)
            .post('/api/v1/threads')
            .set('authorization', `Bearer ${user.body.token}`)
            .send({
              username: user.body.user._id,
              photoUrl: 'blah.jpg',
              caption : 'Me and Shippy, so happy!',
              hashtags: ['#lovethatshippy', '#truelove', '#trustno1']
            })
        ]);
      })

      .then(([user, thread]) => {
        return request(app)
          .post('/api/v1/comments')
          .set('authorization', `Bearer ${user.body.token}`)
          .send({
            username: user.body.user._id,
            thread: thread.body._id,
            body: 'Seeing you and Shippy together makes me so happy'
          });
      })
  
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: expect.any(String),
          thread: expect.any(String),
          body: 'Seeing you and Shippy together makes me so happy'
        });
      });
  });
});
