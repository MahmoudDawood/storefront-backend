import Client from '../database';
import { Order } from '../Models/order';
import { Product } from '../Models/product';

interface OrderUser extends Order {
  name: string;
}

export class DashboardQueries {
  // Get all products associated with orders
  async productsInOrders(): Promise<Product[]> {
    const connection = await Client.connect();
    try {
      // name, price, orders.id as order-Id
      const sql = `SELECT name, price, id as product_id, order_products.order_id as order_Id
        FROM products INNER JOIN order_products ON products.id=order_products.product_id`;
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(
        `Couldn't get products associated with orders. Error: ${err}`
      );
    } finally {
      connection.release();
    }
  }
  // Get all users who made orders
  async usersWithOrders(): Promise<OrderUser[]> {
    const connection = await Client.connect();
    try {
      const sql = `SELECT orders.id as order_Id, orders.status, users.id as user_Id, users.username
        FROM orders INNER JOIN users on users.id=orders.user_id ORDER BY orders.id`;
      const result = await connection.query(sql);
      console.log('result.rows: ', result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't show users who made orders. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  // Get five most expensive products in our store
  async fiveMostExpensiveProducts(): Promise<Product[]> {
    const connection = await Client.connect();
    try {
      const sql =
        'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't five most expensive products. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  // Get top 5 most popular products
  async fiveMostPopularProducts(): Promise<Product[]> {
    const connection = await Client.connect();
    try {
      const sql = `SELECT COUNT(p.id) as count, p.name, p.price FROM products p
          INNER JOIN order_products op ON p.id=op.product_id
          GROUP BY p.name, p.price
          ORDER BY count DESC LIMIT 5`;
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't get five most popular products. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async userCompletedOrders(id: number): Promise<Order[]> {
    const connection = await Client.connect();
    try {
      const sql = `SELECT * FROM orders WHERE user_id=$1 AND status=$2`;
      const result = await connection.query(sql, [id, 'completed']);
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't get user's completed orders. Error: ${err}`);
    } finally {
      connection.release();
    }
  }
}
