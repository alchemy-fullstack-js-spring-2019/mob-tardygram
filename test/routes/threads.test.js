require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
// const User = require('../../lib/models/User');
// const Thread = require('../../lib/models/Thread');
const { getUser, getThread } = require('../data-helpers');

describe('thread routes', () => {
  it('creates a new Thread with POST', () => {
    return getUser()
      .then(user => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({ username: user.username, password: 'password' });
      })
      .then(user => {
        return request(app)
          .post('/api/v1/threads')
          .set('authorization', `Bearer ${user.body.token}`)
          .send({
            username: user.body.user._id,
            photoUrl: 'blah.jpg',
            caption : 'Me and Shippy, so happy!',
            hashtags: ['#lovethatshippy', '#truelove', '#trustno1']
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: expect.any(String),
          photoUrl: 'blah.jpg',
          caption : 'Me and Shippy, so happy!',
          hashtags: ['#lovethatshippy', '#truelove', '#trustno1']
        });
      });
  });

  it('can GET a list of threads', () => {
    return request(app)
      .get('/api/v1/threads')
      .then(res => {
        expect(res.body).toHaveLength(30);
      });
  });

  // it('gets posts by id', () => {
  //   WRITE AFTER COMPLETING COMMENT
  // });

  it('updates a thread caption - user must be authenticated', () => {
    return getUser()
      .then(user => {
        return request(app)
          .post('/api/v1/auth/signin')
          .send({ username: user.username, password: 'password' });
      })
      .then(user => {
        return Promise.all([
          Promise.resolve(user.body),
          request(app)
            .post('/api/v1/threads')
            .set('authorization', `Bearer ${user.body.token}`)
            .send({
              username: user.body.user._id,
              photoUrl: 'blah.jpg',
              caption : 'Me and Shippy, so happy!'
            })
        ]);
      })
      .then(([user, createdThread]) => {
        return request(app)
          .patch(`/api/v1/threads/${createdThread.body._id}`)
          .set('authorization', `Bearer ${user.token}`)
          .send({ caption: 'Shippy died, so has my soul' });
      })
      .then(res => {
        expect(res.body).toEqual({
          username: expect.any(String),
          photoUrl: 'blah.jpg',
          caption : 'Shippy died, so has my soul'
        });
      });
  });
});
