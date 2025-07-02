import React, { useState } from 'react';
import './Quizbox.css';

const Quizbox = ({ question, options, correct_answer }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleSelect = (idx) => {
    setSelectedIdx(idx);
  };

  return (
    <div className="quizbox-container">
      <div className="quizbox-header">
        <h2>{question}</h2>
      </div>
      <div className="quizbox-options">
        {options.map((opt, idx) => {
          let className = 'quizbox-option';
          if (selectedIdx !== null) {
            if (idx === correct_answer) className += ' correct';
            else if (idx === selectedIdx) className += ' wrong';
          }

          return (
            <button
              key={idx}
              className={className}
              onClick={() => handleSelect(idx)}
              disabled={selectedIdx !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selectedIdx !== null && (
        <p className="quizbox-result">
          You selected: {options[selectedIdx]}<br />
          {selectedIdx === correct_answer ? '✅ Correct!' : `❌ Wrong. Correct: ${options[correct_answer]}`}
        </p>
      )}
    </div>
  );
};

export default Quizbox;
