import { ProductStore } from '../../Models/product';

const store = new ProductStore();
const testProduct = {
  name: 'Bicycle',
  price: 2500,
  category: 'sports'
};
const firstProduct = {
  id: 1,
  name: 'Bicycle',
  price: 2500,
  category: 'sports'
};

describe('Test products model methods:', () => {
  it('Should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('Should have an create method', () => {
    expect(store.create).toBeDefined();
  });
  it('Should create product (create)', async () => {
    const product = await store.create(testProduct);
    expect(product.name).toBe('Bicycle');
    expect(product.price).toBe(2500);
    expect(product.category).toBe('sports');
    expect(product).toEqual(firstProduct);
  });
  it('Should show first product (show)', async () => {
    const product = await store.show(1);
    expect(product).toEqual(firstProduct);
  });
  it('Should list all products (index)', async () => {
    const products = await store.index();
    expect(products.length).toBe(1);
    expect(products).toEqual([firstProduct]);
  });
  it('Should list all products in specified category', async () => {
    const toys = await store.showByCategory('toys');
    expect(toys.length).toBe(0);
    expect(toys).toEqual([]);
    const products = await store.showByCategory('sports');
    expect(products.length).toBe(1);
    expect(products).toEqual([firstProduct]);
  });
});
