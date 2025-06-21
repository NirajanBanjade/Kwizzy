import express from 'express';
const router = express.Router();
import pool from '../../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

router.get('/quizzes', authenticateToken, async (req, res) => {
    // comment for me: authenticateToken is a middleware that checks if the user is authenticated.
    // it will attach req.user with the user id.
    try{
        const quizzes = await pool.query('SELECT * FROM quizzes WHERE user_id = $1 ORDER BY id DESC', [req.user.id]); 
        
        console.log("Quizzes fetched are: ",quizzes.rows);
        
        if (quizzes.rows.length === 0) {
            return res.status(404).json({ message: "No quizzes found." });
        }
          
        res.json(quizzes.rows);

    }
    catch(error){
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Failed to fetch quizzes. Web Error!' });
    }
});

router.get('/quizzes/:quiz_id/questions', authenticateToken, async (req, res) => {
    try {
      const quizId = req.params.quiz_id;
  
      const result = await pool.query(
        'SELECT id, question_text, choices, correct_answer FROM questions WHERE quiz_id = $1',
        [quizId]
      );
  
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Failed to fetch questions. Web Error!' });
    }
  });
  
  export default router;