import { QuizGenerator } from './api_keys_test.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });


async function testQuizGenerator() {
  try {
    const quizText = await QuizGenerator.generate({
      topic: 'Data Structures',
      context: 'Stacks, Queues, Linked Lists, Trees and their applications.',
      difficulty: 'medium',
      questions: 5,
      provider: 'gemini', // change to 'openai' if testing OpenAI
      geminiKey: process.env.GEMINI_API_KEY,
      // openaiKey: process.env.OPENAI_API_KEY, // if testing OpenAI
    });

    console.log("📚 Quiz Generated:\n");
    console.log(quizText);
  } catch (err) {
    console.error("❌ Failed to generate quiz:", err);
  }
}

testQuizGenerator();
