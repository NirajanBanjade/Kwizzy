import React from 'react';
import Sidebar from '../sidebar/Sidebar';

const Quiz = () => {
  return (
    <div className="main-main-container">
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          <div className="quiz-container">
            <div className="quiz-content">
              <h1>🎯 Start Quiz</h1>
              <p>Choose a quiz to begin your learning journey!</p>
              
              <div className="quiz-selection">
                <div className="quiz-option">
                  <h3>Python Basics</h3>
                  <p>Test your knowledge of Python fundamentals</p>
                  <button className="start-quiz-btn">Start Quiz</button>
                </div>
                
                <div className="quiz-option">
                  <h3>JavaScript Fundamentals</h3>
                  <p>Master JavaScript concepts and syntax</p>
                  <button className="start-quiz-btn">Start Quiz</button>
                </div>
                
                <div className="quiz-option">
                  <h3>React Essentials</h3>
                  <p>Learn React components and hooks</p>
                  <button className="start-quiz-btn">Start Quiz</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 