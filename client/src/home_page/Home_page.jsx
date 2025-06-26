import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './Homepage.css';
import RecentQuizzes from './Recentquizzes';
const baseURL = import.meta.env.VITE_API_BASE_URL;
const Home_page = () => {

  return (
    <>
    <div className="main-main-container">
      <div className="layout">
        <div className="main-content">
          <h1>Welcome to Quizzy 🎯</h1>
          <p className="subtitle">Your ultimate quiz platform for learning and fun!</p>

          <div className="homepage-grid">
            <div className="left-column">
              <div className="box box1">
                <h3>📊 Your Stats</h3>
                <div className="stats">
                  <div className="stat-row">
                    <span>Quizzes Taken:</span>
                    <span className="highlight">24</span>
                  </div>
                  <div className="stat-row">
                    <span>Average Score:</span>
                    <span className="highlight">85%</span>
                  </div>
                  <div className="stat-row">
                    <span>Best Category:</span>
                    <span className="highlight">Science</span>
                  </div>
                  <div className="stat-row">
                    <span>Streak:</span>
                    <span className="highlight">7 days 🔥</span>
                  </div>
                </div>
              </div>

              <div className="box box2">
                <h3>📈 Performance</h3>
                <div className="performance-bar">
                  <div className="bar-section">
                    <div className="bar-header">
                      <span>This Week</span>
                      <span className="green">+12%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill green" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div className="bar-section">
                    <div className="bar-header">
                      <span>This Month</span>
                      <span className="yellow">+8%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill yellow" style={{ width: '60%' }}></div>
                    </div>
                  </div>

                  <div className="bar-section">
                    <div className="bar-header">
                      <span>Overall</span>
                      <span className="blue">+15%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill blue" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="box box3">
              <div className="recent-quizzes">
                {<RecentQuizzes/>}
              </div>
            </div>
          </div>

          <footer className="footer">
            <p>Made by Nirajan Banjade</p>
            <p>Contact: nirajanbanjade875@gmail.com</p>
          </footer>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home_page;