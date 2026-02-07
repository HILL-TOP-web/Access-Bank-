// tests/transaction.test.js

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

describe('TRANSACTION TESTS', () => {
  it('should create a transfer transaction', async () => {
    const res = await request(app)
      .post('/api/transactions/transfer')
      .set('Authorization', `Bearer ${token}`)
      .send({
        amount: 5000,
        bankCode: '058',
        accountNumber: '1234567890'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.reference).toBeDefined();
  });
});
