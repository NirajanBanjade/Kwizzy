import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const PORT = process.env.PORT;
import pool from '../database/db.js';
import authRoutes from './routes/login.js';

app.use(express.json());

pool.query('SELECT NOW()')
  .then(result => {
    console.log('✅ PostgreSQL connected. Server time:', result.rows[0].now);
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1); // Exit if DB fails
  });

app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
