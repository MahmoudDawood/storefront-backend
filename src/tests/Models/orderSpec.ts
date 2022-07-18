import { OrderStore } from '../../Models/order';
import { User, UserStore } from '../../Models/user';
import { Product, ProductStore } from '../../Models/product';

describe('Tests orders model', () => {
  let store: OrderStore;
  let userStore: UserStore;
  let testUser: User;
  let productStore: ProductStore;
  let testProduct: Product;
  beforeAll(async () => {
    store = new OrderStore();
    userStore = new UserStore();
    testUser = await userStore.create({
      firstName: 'test',
      lastName: 'user',
      username: 'testuser',
      password: 'password'
    });

    productStore = new ProductStore();
    testProduct = await productStore.create({
      name: 'test product',
      price: 200,
      category: 'test category'
    });
  });
  afterAll(async () => {
    // await userStore.delete(testUser.id);
    // await productStore.delete(testProduct.id);
  });
  const testOrder = {
    status: 'Pending',
    user_id: 1
  };

  it('Should have a method to show orders by some user', () => {
    expect(store.ordersByUser).toBeDefined();
  });
  it('Should read all orders (index)', async () => {
    const orders = await store.index();
    expect(orders.length).toBe(0);
  });
  it('Should create an order', async () => {
    const order = await store.create(testOrder);
    const [id, status, user_id] = Object.values(order);
    const numeratedId = +user_id;
    expect([status, numeratedId]).toEqual(Object.values(testOrder));
  });
  it('Should get orders made by a user', async () => {
    const orders = await store.ordersByUser(1);
    expect(orders.length).toBe(1);
    const [id, status, user_id] = Object.values(orders[0]);
    const numeratedId = +user_id;
    expect([status, numeratedId]).toEqual(Object.values(testOrder));
  });
  it('Should add product to order', async () => {
    const product = await store.addProduct(1, 1, 1);
    const [quantity, order_id, product_id] = Object.values(product);
    expect([quantity, order_id, product_id]).toEqual([1, '1', '1']);
    // expect(product).toEqual({quantity: 1, order_id: 1, product_id: 1})
    // const [id, status, user_id] = Object.values(orders[0]);
    // const numeratedId = +user_id;
    // expect([status, numeratedId]).toEqual(Object.values(testOrder));
  });
});
