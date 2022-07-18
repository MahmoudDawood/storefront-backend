import { ProductStore } from '../../Models/product';

const store = new ProductStore();
const testProduct = {
  name: 'test product',
  price: 200,
  category: 'test category'
};
const product = {
  id: 1,
  name: 'test product',
  price: 200,
  category: 'test category'
};
const firstProduct = {
  id: 2,
  name: 'test product',
  price: 200,
  category: 'test category'
};

describe('Test products model:', () => {
  it('Should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('Should have an create method', () => {
    expect(store.create).toBeDefined();
  });
  it('Should create product (create)', async () => {
    const product = await store.create(testProduct);
    expect(product).toEqual(firstProduct);
  });
  it('Should show first product (show)', async () => {
    const product = await store.show(1);
    expect(product).toEqual(product);
  });
  it('Should list all products (index)', async () => {
    const products = await store.index();
    expect(products.length).toBe(2);
    expect(products).toEqual([product, firstProduct]);
  });
  it('Should list all products in specified category', async () => {
    const toys = await store.showByCategory('toys');
    expect(toys.length).toBe(0);
    expect(toys).toEqual([]);
    const products = await store.showByCategory('test category');
    expect(products.length).toBe(2);
    expect(products).toEqual([product, firstProduct]);
  });
});
