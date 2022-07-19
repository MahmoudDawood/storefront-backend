import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Test product router', () => {
  // const userStore = new UserStore();
  let token: string;
  beforeAll(async () => {
    const response = await request.post('/users/').send({
      firstName: '',
      lastName: '',
      username: 'testuser',
      password: 'password'
    });
    // console.log(response.body);
    token = response.body;
  });
  const testProduct = {
    name: 'band',
    price: 100,
    category: 'sports'
  };
  const dbProduct = {
    id: 3,
    name: 'band',
    price: 100,
    category: 'sports'
  };
  it('Test GET (index) method for /products/', async () => {
    // Arrange - Act - Assert
    const response = await request.get('/products/');
    expect(response.status).toBe(200);
    expect(response.text).toEqual(`[]`);
  });
  it('Test PUT (create) method for /products/', async () => {
    // Arrange - Act - Assert
    const result = await request
      .post('/products/')
      .set('Authorization', `Bearer ${token}`)
      .send(testProduct);
    // console.log(token);
    expect(result.status).toBe(200);
    expect(result.body).toEqual(dbProduct);
  });
  it('Test GET (show) method for /products/:id', async () => {
    // Arrange - Act - Assert
    const response = await request.get('/products/3');
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual(dbProduct);
  });
});
