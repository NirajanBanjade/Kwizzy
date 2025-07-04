import React, { useEffect, useState } from 'react';
import History_box from './history_box';
import './history.css';
import { useNavigate } from 'react-router-dom';


const History = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questionsMap, setQuestionsMap] = useState({}); // To store questions per quiz
  const navigate=useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');

    const fetchHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/quizzes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Network error');

        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        console.error('Error fetching quiz history:', err);
      }
    };

    fetchHistory();
  }, []);

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };
  

  return (
    <div className='history-container'>
      {quizzes.map((quiz) => (
        <div key={quiz.id} onClick={() => handleQuizClick(quiz.id)}>
        <History_box
          title={quiz.title}
          total={quiz.total_questions}
          date={new Date(quiz.created_at).toLocaleDateString()} // ✅ Correct prop
          timeTaken={quiz.time_taken || '10 min'}
          onClick={() => handleQuizClick(quiz.id)}
        />



          {/* Optional: render questions if already fetched */}
          {questionsMap[quiz.id] && (
            <ul className="question-list">
              {questionsMap[quiz.id].map((q) => (
                <li key={q.id}>{q.question_text}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
