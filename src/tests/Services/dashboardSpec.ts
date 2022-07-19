import { Order, OrderStore } from '../../Models/order';
import { Product, ProductStore } from '../../Models/product';
import { DashboardQueries } from '../../services/dashboard';

describe('Test dashboard methods', () => {
  const store = new DashboardQueries();
  let product1: Product,
    product2: Product,
    product3: Product,
    product4: Product,
    product5: Product,
    order1: Order,
    order2: Order,
    order3: Order,
    order4: Order,
    order5: Order;
  beforeAll(async () => {
    const productStore = new ProductStore();
    product1 = await productStore.create({
      name: 'product1',
      price: 300,
      category: ''
    });
    product2 = await productStore.create({
      name: 'product2',
      price: 400,
      category: ''
    });
    product3 = await productStore.create({
      name: 'product3',
      price: 500,
      category: ''
    });
    product4 = await productStore.create({
      name: 'product4',
      price: 600,
      category: ''
    });
    product5 = await productStore.create({
      name: 'product5',
      price: 700,
      category: ''
    });

    const orderStore = new OrderStore();
    order1 = await orderStore.create({
      status: 'pending',
      user_id: 1
    });
    order2 = await orderStore.create({
      status: 'pending',
      user_id: 1
    });
    order3 = await orderStore.create({
      status: 'pending',
      user_id: 1
    });
    order4 = await orderStore.create({
      status: 'completed',
      user_id: 1
    });
    order5 = await orderStore.create({
      status: 'completed',
      user_id: 1
    });
    await orderStore.addProduct(1, order1.id, product1.id);
    await orderStore.addProduct(1, order2.id, product1.id);
    await orderStore.addProduct(1, order3.id, product1.id);
    await orderStore.addProduct(1, order4.id, product1.id);
    await orderStore.addProduct(1, order5.id, product1.id); // product1 >> 5
    await orderStore.addProduct(1, order1.id, product2.id);
    await orderStore.addProduct(1, order2.id, product2.id);
    await orderStore.addProduct(1, order3.id, product2.id);
    await orderStore.addProduct(1, order4.id, product2.id); // product2 >> 4
    await orderStore.addProduct(1, order1.id, product3.id);
    await orderStore.addProduct(1, order2.id, product3.id);
    await orderStore.addProduct(1, order3.id, product3.id); // product3 >> 3
    await orderStore.addProduct(1, order1.id, product4.id);
    await orderStore.addProduct(1, order2.id, product4.id); // product4 >> 2
    await orderStore.addProduct(1, order1.id, product5.id); // product5 >> 1
  });
  it('Should list most popular product desc', async () => {
    const products = await store.fiveMostPopularProducts();
    // console.log(products[0]);
    expect([
      products[0].name,
      products[1].name,
      products[2].name,
      products[3].name,
      products[4].name
    ]).toEqual([
      product1.name,
      product2.name,
      product3.name,
      product4.name,
      product5.name
    ]);
  });
  it('Should list most expensive products desc', async () => {
    const products = await store.fiveMostExpensiveProducts();
    // console.log(products[0]);
    expect([
      products[0].price,
      products[1].price,
      products[2].price,
      products[3].price,
      products[4].price
    ]).toEqual([
      product5.price,
      product4.price,
      product3.price,
      product2.price,
      product1.price
    ]);
  });
  it('Should list completed orders by a user', async () => {
    const products = await store.userCompletedOrders(1);
    expect(products.length).toBe(2);
    expect([
      products[0].status,
      +products[0].user_id,
      products[1].status,
      +products[1].user_id
    ]).toEqual(['completed', 1, 'completed', 1]);
  });
});
