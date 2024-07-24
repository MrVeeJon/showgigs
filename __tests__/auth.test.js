const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Authentication Routes', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/showgigs_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('username', 'testuser');
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    it('should not register a user with an existing email', async () => {
      const res = await request(app)
        .post('/api/register')
        .send({
          username: 'testuser2',
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Email already exists');
    });
  });

  describe('POST /api/login', () => {
    it('should login an existing user', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('username', 'testuser');
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });
  });

  describe('GET /api/protected', () => {
    let token;

    beforeAll(async () => {
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      token = res.body.token;
    });

    it('should access protected route with valid token', async () => {
      const res = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'This is a protected route');
    });

    it('should not access protected route without token', async () => {
      const res = await request(app).get('/api/protected');

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Access denied. No token provided.');
    });

    it('should not access protected route with invalid token', async () => {
      const res = await request(app)
        .get('/api/protected')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Invalid token');
    });
  });
});

