const request = require('supertest');
const app = require('../../lib/app');
const { getUser } = require('../data-helpers');

describe('post routes', () => {
  it('can create a new post', () => {
    return getUser()
      .then(user => {
        return request(app)
          .post('/api/v1/posts')
          .send({
            user: user._id,
            photoUrl: 'string.jpg',
            caption: 'word'
          });
      });
  });
});
