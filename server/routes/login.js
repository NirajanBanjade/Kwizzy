// login.js
import express from 'express';
import pool from '../../database/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            return res.status(409).json({ message: 'User already exists! Login!' });
        }

        const added_user = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password] // password should be hashed in production
        );

        res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        console.error('Register error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { identifier, password } = req.body; // generalize as dentifier not specific name/email. same (identifier ) passed in postman.

    if ((!identifier)&&(!password) ) {
        return res.status(400).json({ message: 'Credentials Missing!' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 OR name=$1', [identifier]); //give rows for if email or names are there.

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User doesn't exist! Register !" });
        }
        
        if(password!==result.rows[0].password_hash){
            return res.status(401).json({ message: 'Invalid password' });
        }
        const user = result.rows[0];

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
        
    }
    catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Server side error' });
    }
});

export default router;
