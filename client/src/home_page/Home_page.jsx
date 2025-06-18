import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './Homepage.css';

const Home_page = () => {
  const [name, setName] = useState('User');
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem('username') || 'User';
    setName(storedName);

    const fetchQuizzes = async () => {
      setRecentQuizzes([
        { id: 1, title: 'Math Quiz' },
        { id: 2, title: 'Science Quiz' }
      ]);
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className='main-container-homepage'>
        <div className="greeting fade-in">
          <h1>
            <span className="wave">👋</span>
            <span className="bold-text">Welcome, {name}!</span>
          </h1>
          <h2 className="sub-greeting">Ready to go? Let's ace your next quiz!</h2>
        </div>
        <div className='recent-quizzes fade-in'>
          <h2 className="bold-text">Recent Quizzes</h2>
          {recentQuizzes.length > 0 ? (
            <div className="quiz-list">
              {recentQuizzes.map(quiz => (
                <div className="quiz-card" key={quiz.id}>
                  <span role="img" aria-label="quiz">📝</span>
                  <span className="quiz-title">{quiz.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-quizzes">No recent quizzes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home_page;