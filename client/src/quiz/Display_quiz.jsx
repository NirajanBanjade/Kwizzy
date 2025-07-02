import React from 'react';
import Quizbox from '../quizbox/Quizbox';
import { useLocation } from 'react-router-dom';

const Display_quiz = () => {
  const { state } = useLocation();
  const quizData = state?.quizData || [];

  // ✅ Define this mapping inside your component
  const letterToIndex = { A: 0, B: 1, C: 2, D: 3 };

  return (
    <div className='display-quiz-container'>
      <h1>🧠 Your Quiz</h1>
      {quizData.map((item, index) => (
        <Quizbox
          key={index}
          question={item.question}
          options={Object.values(item.options)}
          correct_answer={letterToIndex[item.answer?.trim().toUpperCase()]} // ✅ Corrected here
        />
      ))}
    </div>
  );
};

export default Display_quiz;
