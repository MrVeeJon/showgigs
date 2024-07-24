const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');
const User = require('../models/User');
const Event = require('../models/Event');

describe('Event Routes', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/showgigs_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    await user.save();

    userId = user._id;
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password123' });

    token = res.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Event.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/events', () => {
    it('should create an event', async () => {
      const event = {
        name: 'Test Event',
        description: 'This is a test event',
        location: 'Test Location',
        date: new Date(),
        hirer: userId,
      };

      const res = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send(event);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('name', 'Test Event');
    });

    it('should not create an event without a name', async () => {
      const event = {
        description: 'This is a test event',
        location: 'Test Location',
        date: new Date(),
        hirer: userId,
      };

      const res = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send(event);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Event name is required.');
    });
  });
});

