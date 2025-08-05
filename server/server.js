import express from 'express';
const app = express();

import dotenv from 'dotenv';
// dotenv.config({ path: '../.env' });
dotenv.config();
const PORT = process.env.PORT;
import pool from '../database/db.js';
import authRoutes from './routes/login.js';
import quizRoutes from './routes/quiz.js';
import userRoutes from './routes/user.js';
import gptRoutes from './routes/gpt.js'; // ✅ ADD THIS
import cors from 'cors';
app.use(cors());

app.use(express.json());

pool.query('SELECT NOW()')
  .then(result => {
    console.log('✅ PostgreSQL connected. Server time:', result.rows[0].now);
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1); // Exit if DB fails
  });

app.use('/api/auth', authRoutes);//All routes inside authRoutes will be prefixed with /api/auth
app.use('/api/user', quizRoutes);//All routes inside quizRoutes will be prefixed with /api/user
app.use('/api/user', userRoutes);//All routes inside userRoutes will be prefixed with /api/user
app.use('/api/gpt', gptRoutes); // ✅ ADD THIS

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
