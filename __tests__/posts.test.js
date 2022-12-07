const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  // TEST 1: logged in user can get all posts
  it('/api/v1/posts should list all posts if user is logged in', async () => {
    const agent = await request.agent(app);
    // login a mock user to get cookie and authenticate
    const res = await agent.get('/api/v1/github/callback?code=17').redirects(1);
    expect(res.status).toBe(200);
    // get all posts
    const posts = await agent.get('/api/v1/posts');
    expect(posts.status).toBe(200);
    expect(posts.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "description": "It all began...",
          "id": "1",
          "title": "A Wild Story",
        },
        Object {
          "description": "All you need to know",
          "id": "2",
          "title": "Info on beetles",
        },
        Object {
          "description": "See you there!",
          "id": "3",
          "title": "Party on Tuesday",
        },
      ]
    `);
  });

  // TEST 2: logged in user can create post

  // TEST 3: not logged in trying to post gets 401
  it('/api/v1/posts will return 401 if user is not logged in', async () => {
    const res = await request(app).get('/api/v1/posts');
    // console.log('POSTS TEST, posts: ', posts);
    expect(res.status).toBe(401);
  });
});
