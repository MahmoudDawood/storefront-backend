import Client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    const connection = await Client.connect();
    try {
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't get all products: Error ${err}`);
    } finally {
      connection.release();
    }
  }

  async show(id: number): Promise<Product> {
    const connection = await Client.connect();
    try {
      const sql = 'SELECT id FROM products WHERE id=$1';
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't get product: Error ${err}`);
    } finally {
      connection.release();
    }
  }

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const connection = await Client.connect();
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(sql, [product.name, product.price]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't create product: Error ${err}`);
    } finally {
      connection.release();
    }
  }
}
