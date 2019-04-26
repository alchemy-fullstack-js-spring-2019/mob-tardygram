require('../data-helpers');
const request = require('supertest');
const app = require('../../lib/app');

describe('user route tests', () => {
  it('can return the top 10 users with the most total comments on their posts', async() => {
    const res = await request(app)
      .get('/api/v1/users/popular');
    expect(res.body).toHaveLength(10);
  });
  it('can return the top 10 users with the most posts', async() => {
    const res = await request(app)
      .get('/api/v1/users/prolific');
    expect(res.body).toHaveLength(10);
  });
  it('can respond with the 10 users with the most comments', async() => {
    const res = await request(app)
      .get('/api/v1/users/leader');
    expect(res.body).toHaveLength(10);
  });
  it('can respond with the 10 users with the most average comments per post', async() => {
    const res = await request(app)
      .get('/api/v1/users/impact');
    expect(res.body).toHaveLength(10);
  });
});
