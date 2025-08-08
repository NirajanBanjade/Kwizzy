import { Pool } from 'pg';
import dotenv from 'dotenv';
// dotenv.config({ path: '../.env' }); // adjust based on actual location
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '../.env' });
}


//establishing database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT, // optional but match .env
  });
  
export default pool;