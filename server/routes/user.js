import express from 'express';
const router = express.Router();
import pool from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

router.get('/profile', authenticateToken, async (req, res) => {
    try{
        const user_id = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [req.user.id]);
        res.json(user_id.rows[0]);
    }
    catch(error){
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Failed to fetch user profile. Web Error!' });
    }
});

export default router;

