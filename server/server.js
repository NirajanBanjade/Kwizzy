import express from 'express';
const app = express()
const PORT = process.env.PORT || 5000;
import pool from '../database/db.js';



pool.query('SELECT NOW()')
  .then(result => {
    console.log('✅ PostgreSQL connected. Server time:', result.rows[0].now);
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1); // Exit if DB fails
  });
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
