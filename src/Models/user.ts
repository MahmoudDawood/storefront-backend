import Client from '../database';

export type User = {
  id: number;
  name: string;
  phone: number;
  address: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    const connection = await Client.connect();
    try {
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Couldnt get all users. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async show(id: number): Promise<User> {
    const connection = await Client.connect();
    try {
      const sql = 'SELECT * FROM users WHERE id=$1';
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldnt get user. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const connection = await Client.connect();
    try {
      const sql =
        'INSERT INTO users (name, phone, address) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        user.name,
        user.phone,
        user.address
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldnt create user. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async delete(id: number): Promise<User> {
    const connection = await Client.connect();
    try {
      const sql = 'DELETE FROM users WHERE id=$1';
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldnt delete user. Error: ${err}`);
    } finally {
      connection.release();
    }
  }
}
