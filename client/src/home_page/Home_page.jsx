import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './Homepage.css';

const Home_page = () => {
  const [name, setName] = useState('User');
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  return (
    <>
    <div className="layout">
    <Sidebar />
      <div className="main-content">
        <h1>Welcome to Quizzy.</h1>

      </div>
    </div>
    </>
  );
};

export default Home_page;
