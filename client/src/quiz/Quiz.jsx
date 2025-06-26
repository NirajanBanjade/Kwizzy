import React, { useState } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [form, setForm] = useState({
    topic: '',
    level: 'easy',
    grade: 'bachelors',
    questions: 10,
    time: 15,
    keywords: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🧾 Submitted Form:', form);
    // TODO: Send to backend
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h1 className="quiz-title">🎯 Customize Your Quiz</h1>
  
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="label">Topic</label>
              <input
                type="text"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
  
            <div>
              <label className="label">Difficulty Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="select"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
  
            <div>
              <label className="label">Education Level</label>
              <select
                name="grade"
                value={form.grade}
                onChange={handleChange}
                className="select"
              >
                <option value="bachelors">Bachelors</option>
                <option value="masters">Masters</option>
                <option value="phd">PhD</option>
              </select>
            </div>
  
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="label">Questions</label>
                <input
                  type="number"
                  name="questions"
                  value={form.questions}
                  onChange={handleChange}
                  className="input"
                  min={1}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="label">Time (min)</label>
                <input
                  type="number"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="input"
                  min={1}
                  required
                />
              </div>
            </div>
          </div>
  
          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="label">Context / Focus / Keywords (Optional)</label>
              <textarea
                name="keywords"
                value={form.keywords}
                onChange={handleChange}
                rows={4}
                className="textarea"
                placeholder="Write a sentence or paragraph about what you'd like the quiz to focus on..."
              />
            </div>
  
            <div>
              <label className="label">Attach PDF / DOCX / TXT (Optional)</label>
              <input
                type="file"
                name="file"
                accept=".pdf,.txt,.docx"
                onChange={handleChange}
                className="file"
              />
            </div>
          </div>
  
          {/* Submit */}
          <div className="md:col-span-2">
            <button type="submit" className="submit-btn">
              🚀 Generate Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  )};
  

export default Quiz;
