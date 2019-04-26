require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');

describe('user route tests', () => {
  it('can return the top 10 users with the most total comments on their posts', async() => {
    const res = await request(app)
      .get('/api/v1/users/popular');
    expect(res.body).toHaveLength(10);
  });
});
