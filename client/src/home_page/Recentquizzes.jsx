// src/components/RecentQuizzes.jsx
import React, { useEffect, useState } from 'react';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const RecentQuizzes = () => {
  const [quizTitles, setQuizTitles] = useState([]);

  const fetchRecentQuizzes = async (token) => {
    try {
      const res = await fetch(`${baseURL}/user/quizzes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const titles = data.map((quiz) => quiz.title);
        setQuizTitles(titles);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      fetchRecentQuizzes(token);
    }
  }, []);

  return (
    <div className="box box3">
      <h3>🎯 Recent Quizzes</h3>
      <div className="recent-quizzes">
        {quizTitles.length > 0 ? (
          quizTitles.slice(0, 4).map((title, index) => {
            const colors = ['purple', 'green', 'yellow', 'red'];
            const color = colors[index % colors.length];
            return (
              <div key={index} className={`quiz-card ${color}`}>
                <div className="quiz-title">{title}</div>
                <div className="quiz-info">Quiz #{index + 1}</div>
              </div>
            );
          })
        ) : (
          <div className="quiz-card purple">
            <div className="quiz-title">No quizzes found</div>
            <div className="quiz-info">Create your first quiz!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentQuizzes;
