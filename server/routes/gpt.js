// routes/gpt.js
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Shared quiz generation logic
const generateQuiz = async ({ topic, context, difficulty, questions, provider }) => {
  const prompt = `
You are an AI that generates educational quizzes.
Topic: ${topic}
Difficulty: ${difficulty}
Number of questions: ${questions}
Context: ${context || 'N/A'}

Generate multiple-choice questions in this format:
Q: ...
A. ...
B. ...
C. ...
D. ...
Answer: ...
`;

  if (provider === 'gemini') {
    const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
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
router.post('/generate', async (req, res) => {
  try {
    const { topic, context, difficulty, questions, provider } = req.body;
    const quiz = await generateQuiz({ topic, context, difficulty, questions, provider });
    res.json({ quiz });
  } catch (err) {
    console.error('[Quiz Generation Error]', err.message);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

export default router;
