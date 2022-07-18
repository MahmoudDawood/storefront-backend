import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS || '1';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
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
        'INSERT INTO users (firstName, lastName, username, password)VALUES ($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );
      const result = await connection.query(sql, [
        user.firstName,
        user.lastName,
        user.username,
        hash
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldnt create user. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const connection = await Client.connect();
    try {
      const sql = 'SELECT * FROM users WHERE username=$1';
      const result = await connection.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) return user;
      }
      return null;
    } catch (err) {
      throw new Error(`Couldn't authenticate user'. Error: ${err}`);
    } finally {
      connection.release();
    }
  }

  // Deletes user with it's orders
  // async delete(id: number): Promise<User> {
  //   const connection = await Client.connect();
  //   try {
  //     // const sql = `DELETE FROM orders WHERE user_id=$1`;
  //     const sql = `DELETE FROM users WHERE id=$1 RETURNING *`;
  //     // await connection.query(sql, [id]);
  //     const result = await connection.query(sql, [id]);
  //     return result.rows[0];
  //   } catch (err) {
  //     throw new Error(`Couldnt delete user. Error: ${err}`);
  //   } finally {
  //     connection.release();
  //   }
  // }
}
