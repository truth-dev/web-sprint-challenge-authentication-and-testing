// Write your tests here

const request = require('supertest')
const server = require('./server')  
const db = require('../data/dbConfig')

it('[0] runs the tests', () => {
expect(true).toBe(true)
})



beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})



describe('server.js', () => {
describe('[POST]/api/auth/register', () => {
it('[1] responds with 201 OK', async () => {
const res =  request(server).post('/api/auth/register')
expect(res.status).toMatch(201)  
})
})
})
