const request = require("supertest");
const server = require("../api/server.js");

const db = require("../data/dbConfig.js");

describe('[POST] /api/auth/register', () => {
  test('responds with the newly created user', async () => {
    await db('users').truncate();
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' });
    expect(res.status).toBe(201);
  }, 500);  
  test('responds with a 400 if username or password is missing', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'test' });
    expect(res.status).toBe(400);
  }, 500);
});



