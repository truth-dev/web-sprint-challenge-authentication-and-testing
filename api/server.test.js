

const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

beforeEach(async () => { 
  await db('users').truncate();
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {  
  await db.destroy();
});

test('sanity', () => {
  expect(true).toBe(true);
});


describe('server.js', () => {
  describe('server.js', () => {
    it('should run the tests', () => {
      expect(true).toBe(true);
    });
  });
  describe('POST /register', () => {
    it('should return 201 status', async () => {
      const res = await request(server)
        .post('api/auth/register')
        .send({ username: 'users', password: 'password' });
      expect(res.status).toBe(201);
    });

    it('should return a message', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: 'users', password: 'password' });
      expect(res.body.message).toBe(`Welcome users to the dad joke app!`);
    });
  });

  describe('POST /login', () => {
    it('should return 200 status', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ username: 'users', password: 'password' });
      expect(res.status).toMatch(200);
    });

    it('should return a token', async () => {
      const res = await request(server)
        .post('/api/auth/login')
        .send({ username: 'user', password: 'password' });
      expect(res.body.token).toBeDefined();
    });
  });
});
  