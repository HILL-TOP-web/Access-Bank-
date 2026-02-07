// tests/wallet.test.js

import request from 'supertest';
import app from '../app.js';

let token;

beforeAll(async () => {
  const login = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'testuser@mail.com',
      password: 'Password123'
    });

  token = login.body.data.token;
});

describe('WALLET TESTS', () => {
  it('should get wallet balance', async () => {
    const res = await request(app)
      .get('/api/wallet')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.balance).toBeDefined();
  });
});
