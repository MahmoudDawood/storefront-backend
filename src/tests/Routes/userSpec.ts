import app from '../../server';
import supertest from 'supertest';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const request = supertest(app);

describe('Test user router', () => {
  const testUser = {
    firstName: 'Mark',
    lastName: 'Twain',
    username: 'mtmtm',
    password: 'password'
  };
  let token: string;
  beforeAll(async () => {
    const response = await request.post('/users').send(testUser);
    token = response.body;
  });

  it('Test GET (index) method for /users/', async () => {
    const result = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toBe(200);
    // expect(JSON.parse(result.text[result.text.length])).toBe(`[${dbUser}]`);
  });
  it('Test POST (create) method for /users/', async () => {
    const result = await request.post('/users').send(testUser);
    expect(result.status).toBe(200);
    expect(
      jwt.verify(result.body, process.env.TOKEN_SECRET as string)
    ).toBeDefined();
  });
  it('Test GET (show) method for /users/:id', async () => {
    // Arrange - Act - Assert
    const result = await request
      .get('/users/4')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toBe(200);
    const [, firstName, lastName, username] = Object.values(
      JSON.parse(result.text)
    );
    expect([firstName, lastName, username]).toEqual(['Mark', 'Twain', 'mtmtm']);
  });
});
