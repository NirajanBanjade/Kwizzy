import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
const geminiKey = process.env.GEMINI_API_KEY;

export const QuizGenerator = {
  generate: async ({ topic, context, difficulty, questions, provider, geminiKey}) => {
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
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }
   else if (provider === 'openai') {
      const openai = new OpenAI({ apiKey: openaiKey });

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an AI that generates educational quizzes." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      });

      return chatCompletion.choices[0].message.content;

    } else {
      throw new Error("Unsupported provider");
    }
  }
};

