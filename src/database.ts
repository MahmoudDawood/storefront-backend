import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { PG_HOST, PG_DATABASE, PG_DATABASE_TEST, PG_USER, PG_PASSWORD, ENV } =
  process.env;

const database = ENV === 'test' ? PG_DATABASE_TEST : PG_DATABASE;
console.log('Database: ' + database);

const Client = new Pool({
  host: PG_HOST,
  database,
  user: PG_USER,
  password: PG_PASSWORD
});

export default Client;
