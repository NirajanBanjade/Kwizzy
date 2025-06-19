import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // adjust based on actual location

//establishing database connection
const pool =new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: 5432,
    }
);
export default pool;