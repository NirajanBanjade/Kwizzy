import React from 'react';
import './history_box.css';

const History_box = ({ title, total, date, timeTaken,onClick }) => {
  return (
    <div className="history-card">
      <div className="header">
        <h2 className="quiz-title">📘 {title}</h2>
        <span className="date-badge">📅 {date}</span>
      </div>

      <div className="quiz-details">
        <p>❓ Total Questions: <strong>{total}</strong></p>
        <p>⏱️ Time Taken: <strong>{timeTaken || 'N/A'}</strong></p>
        <p>🧾 Status: <span className="status-tag">Completed</span></p>
      </div>
      <br/>
      <button id="button-qn" onClick={onClick}>👁️ See all Q/NAs</button>
    </div>
  );
};

export default History_box;
