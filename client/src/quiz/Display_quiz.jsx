import React from 'react';
import Quizbox from '../quizbox/Quizbox';
import { useLocation } from 'react-router-dom';
const Display_quiz = ({ quizData }) => {
    const { state } = useLocation();
    const quizData = state?.quizData || [];
    return (
        <div>
          <h1>🧠 Your Quiz</h1>
          {quizData.map((item, index) => (
            <Quizbox
              key={index}
              question={item.question}
              options={Object.values(item.options)}
              correctAnswer={item.answer}
            />
          ))}
        </div>
      );
      
};

export default Display_quiz;
