import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {
  PG_HOST,
  PG_DATABASE,
  PG_USER,
  PG_PASSWORD
} = process.env

const client = new Pool({
  host: PG_HOST,
  database: PG_DATABASE,
  user: PG_USER,
  password: PG_PASSWORD,
});

export default client