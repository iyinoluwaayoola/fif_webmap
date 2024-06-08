import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  PGUSER,
  PGHOST,
  PGDATABASE,
  PGPASSWORD,
  PGPORT
} = process.env;

if (!PGUSER || !PGHOST || !PGDATABASE || !PGPASSWORD || !PGPORT) {
  throw new Error('One or more required environment variables are not defined');
}

const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: parseInt(PGPORT),
  ssl: { rejectUnauthorized: false } // This line is only required if using SSL
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

export default pool;
