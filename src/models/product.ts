import Client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
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
      const sql = 'SELECT * FROM products WHERE id=$1';
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
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't create product: Error ${err}`);
    } finally {
      connection.release();
    }
  }

  async showByCategory(category: string): Promise<Product[]> {
    const connection = await Client.connect();
    try {
      const sql = 'SELECT * FROM products WHERE category=$1';
      const result = await connection.query(sql, [category]);
      return result.rows;
    } catch (err) {
      throw new Error(
        `Couldn't get products in category ${category}: Error ${err}`
      );
    } finally {
      connection.release();
    }
  }
}
