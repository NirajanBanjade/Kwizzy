import { QuizGenerator } from './api_keys_test.js';

const quiz = await QuizGenerator.generate({
  topic: 'Data structures and algorithms',
  context: 'basics of dsa and its types',
  difficulty: 'medium',
  questions: 5,
  provider: 'gemini', // or 'openai'
  geminiKey: 'YOUR_GEMINI_API_KEY',
//   openaiKey: 'YOUR_OPENAI_API_KEY'
});

console.log(quiz);
