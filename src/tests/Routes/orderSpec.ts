import { UserStore } from '../../Models/user';
import { Order, OrderStore } from '../../Models/order';
import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Test orders route', () => {
  // let testOrder: Order;
  const testOrder = {
    status: 'shipped',
    userId: 1
  };
  it('Test GET (index) method on /orders/', async () => {
    const result = await request.get('/orders');

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(1);
  });
  it('Test POST (create) method on /orders/', async () => {
    const result = await request.post('/orders').send(testOrder);

    expect(result.status).toBe(200); // Check reation status code to be 201 ---------
    expect(result.body.status).toBe('shipped');
    expect(+result.body.user_id).toBe(1);
  });
  it('Test GET (ordersByUser) method on /orders/:id', async () => {
    // Arrange
    const id = 1;
    // Act
    const result = await request.get(`/orders/${id}`);
    // Assert

    expect(result.status).toBe(200);
    expect(+result.body[1].user_id).toBe(id);
    expect(result.body[1].status).toBe('shipped');
  });
  it('Test GET (userCompletedOrders) method on /user-completed-orders/:id', async () => {
    // Arrange
    const id = 1;
    // Act
    const result = await request.get(`/user-completed-orders/${id}`);
    // Assert
    expect(result.status).toBe(200);
    expect(result.body).toEqual([]);
  });
});
