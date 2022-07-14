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
      const sql = `SELECT orders.id as order_Id, orders.status, users.id as user_Id, users.name
        FROM orders INNER JOIN users on users.id=orders.user_id ORDER BY orders.id`;
      const result = await connection.query(sql);
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
}
