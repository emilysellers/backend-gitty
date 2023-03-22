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

  it('/api/v1/posts should list all posts if user is logged in', async () => {
    const agent = await request.agent(app);
    const res = await agent.get('/api/v1/github/callback?code=17').redirects(1);
    expect(res.status).toBe(200);

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

  it('POST /api/v1/posts creates a new post for logged in user', async () => {
    const agent = request.agent(app);
    const res = await agent.get('/api/v1/github/callback?code=17').redirects(1);
    expect(res.status).toBe(200);

    const newPost = await agent
      .post('/api/v1/posts')
      .send({ title: 'Tester', description: 'a new thing' });
    expect(newPost.body).toEqual({
      id: '4',
      title: 'Tester',
      description: 'a new thing',
    });
  });

  it('/api/v1/posts will return 401 if user is not logged in', async () => {
    const res = await request(app).get('/api/v1/posts');
    expect(res.status).toBe(401);
  });
});
