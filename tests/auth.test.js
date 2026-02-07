// tests/auth.test.js

import request from 'supertest';
import app from '../app.js';

describe('AUTH TESTS', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testuser@mail.com',
        password: 'Password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should login user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@mail.com',
        password: 'Password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });
});
