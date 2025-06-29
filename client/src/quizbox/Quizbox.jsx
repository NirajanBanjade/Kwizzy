import React, { useState } from 'react';
import './Quizbox.css';

const Quizbox = ({ question, options }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div className="quizbox-container">
      <div className="quizbox-header">
        <h2>{question}</h2>
      </div>
      <div className="quizbox-options">
        {options.map((opt, idx) => (
          <button
            key={idx}
            className={`quizbox-option ${selected === opt ? 'selected' : ''}`}
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {selected && <p className="quizbox-result">You selected: {selected}</p>}
    </div>
  );
};

export default Quizbox;
