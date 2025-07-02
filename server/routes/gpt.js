// routes/gpt.js
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import pool from '../../database/db.js';
import { authenticateToken } from '../middleware/auth.js';


const router = express.Router();

// Shared quiz generation logic
const generateQuiz = async ({ topic, context, difficulty, questions, provider }) => {
  const prompt = `
You are an AI that generates educational quizzes.
Topic: ${topic}
Difficulty: ${difficulty}
Number of questions: ${questions}
Context: ${context || 'N/A'}

Generate exactly ${questions} multiple-choice questions in this format:
Q: ...
A. ...
B. ...
C. ...
D. ...
Answer: ...
`;

  if (provider === 'gemini') {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();

  } else if (provider === 'openai') {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an AI that generates educational quizzes.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    return chatCompletion.choices[0].message.content;

  } else {
    throw new Error('Unsupported provider');
  }
};

// POST /api/gpt/generate : post api to pass the required parameters to the function . the function calls the original gemini api to generate the quiz.
router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { topic, context, difficulty, questions, provider } = req.body;
    const quiz = await generateQuiz({ topic, context, difficulty, questions, provider });
    const quizJson = parseQuizTextToJson(quiz);

    const quiz_insert = await pool.query(
      'INSERT INTO quizzes (user_id, title) VALUES ($1, $2) RETURNING id',
      [req.user.id, topic]
    );

    const quiz_id = quiz_insert.rows[0].id;

    for (const question of quizJson) {
      await pool.query(
        'INSERT INTO questions (quiz_id, question_text, choices, correct_answer) VALUES ($1, $2, $3, $4)',
        [quiz_id, question.question, Object.values(question.options), question.answer]
      );
    }

    res.json({ quizJson });
  } catch (err) {
    console.error('[Quiz Generation Error]', err.message);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});


function parseQuizTextToJson(rawText) {
    const questions = rawText.trim().split(/Q:\s+/).filter(Boolean);
    const parsed = [];
  
    for (const block of questions) {
      const lines = block.trim().split('\n').filter(Boolean);
      const question = lines[0];
      const options = {};
      let answer = "";
  
      for (let line of lines.slice(1)) {
        if (line.startsWith("A.")) options["A"] = line.slice(2).trim();
        else if (line.startsWith("B.")) options["B"] = line.slice(2).trim();
        else if (line.startsWith("C.")) options["C"] = line.slice(2).trim();
        else if (line.startsWith("D.")) options["D"] = line.slice(2).trim();
        else if (line.startsWith("Answer:")) answer = line.split("Answer:")[1].trim();
      }
  
      parsed.push({ question, options, answer });
    }
  
    return parsed;
  }


export default router;
