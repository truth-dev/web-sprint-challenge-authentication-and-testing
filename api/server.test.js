const request = require("supertest");
const server = require("../api/server.js");

const db = require("../data/dbConfig.js");


describe('auth-router', () => {
  describe('[POST] /register', () => {
    it('responds with the newly created user', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: 'test', password: 'test' });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('username', 'test');
    });

    it('responds with "username and password required" if either is not sent', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: 'test' });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'username and password required');
    });
  });

  describe('[POST] /login', () => {
    it('responds with "Invalid Credentials" if username is not found', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ username: 'nonexistent', password: 'test' });
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid Credentials');
    });

    it('responds with "Invalid Credentials" if password is incorrect', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ username: 'test', password: 'wrong' });
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid Credentials');
    });

  });
});
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
afterEach(async () => {
  await db("users").truncate();
});



