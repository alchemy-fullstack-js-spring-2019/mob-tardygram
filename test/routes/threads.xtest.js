require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
// const User = require('../../lib/models/User');
// const Thread = require('../../lib/models/Thread');
const { getUser } = require('../data-helpers');

describe('thread routes', () => {
  it('creates a new Thread with POST', () => {
    return getUser()
      .then(user => {
        return request(app)
          .post('/api/v1/threads')
          .send({
            username: user._id,
            photoUrl: 'blah.jpg',
            caption : 'Me and Shippy, so happy!',
            hashtag: ['#lovethatshippy', '#truelove', '#trustno1']
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: expect.any(String),
          photoUrl: 'blah.jpg',
          caption : 'Me and Shippy, so happy!',
          hashtag: ['#lovethatshippy', '#truelove', '#trustno1']
        });
      });
  });
});
