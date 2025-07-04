import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './quiz_details.css'

const Quiz_details = () => {
  const { quizId } = useParams(); // ✅ Get quiz ID from URL
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');

    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/quizzes/${quizId}/questions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Network error');

        const data = await response.json();
        console.log("Quiz Details: ", data);
        setQuestions(data); // ✅ Store questions in state
      } catch (err) {
        console.error('Error fetching quiz details:', err);
      }
    };

    fetchQuizDetails(); // ✅ Call the function
  }, [quizId]);

  return (
        <div className="quiz-details-container">
        <h2>📘 Quiz Details - ID: {quizId}</h2>
        <ul className="question-list">
            {questions.map((q, index) => (
            <li key={q.id} className="question-item">
                <strong>Q{index + 1}:</strong> {q.question_text}

                <div className="choices">
                {q.choices?.map((choice, i) => (
                    <div key={i} className="choice">
                    🔹 {choice}
                    </div>
                ))}
                </div>

                <div className="correct-answer">✅ Correct Answer: {q.correct_answer}</div>
            </li>
            ))}
        </ul>
        </div>


  );
};

export default Quiz_details;
