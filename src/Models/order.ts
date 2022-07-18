import Client from '../database';

export type Order = {
  id: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    const connection = await Client.connect();
    try {
      const sql = 'SELECT * FROM orders';
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Couldnt get all orders. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async ordersByUser(id: number): Promise<Order[]> {
    // Show orders by user
    const connection = await Client.connect();
    try {
      const sql = 'SELECT * FROM orders INNER JOIN users ON users.id=$1';
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (err) {
      throw new Error(`Couldnt show order details. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async create(order: Omit<Order, 'id'>): Promise<Order> {
    const connection = await Client.connect();
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(sql, [order.status, order.user_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldnt create order. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    const connection = await Client.connect();
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        quantity,
        orderId,
        productId
      ]);
      // console.log(result.rows[0]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't add product to order. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  // async delete(id: number): Promise<Order> {
  //   const connection = await Client.connect();
  //   try {
  //     const sql = 'DELETE FROM orders WHERE id=$1';
  //     const result = await connection.query(sql, [id]);
  //     return result.rows[0];
  //   } catch (err) {
  //     throw new Error(`Couldnt delete order. Error: ${err}`);
  //   } finally {
  //     connection.release();
  //   }
  // }
}
