import React, { useState } from 'react';

const Quiz = () => {
  const [form, setForm] = useState({
    topic: '',
    level: 'easy',
    grade: 'bachelors',
    questions: 5,
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
    console.log('Form submitted:', form);
    // ⬇️ Your GPT quiz generation logic goes here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">🧠 Generate Your Custom Quiz</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Topic */}
          <div>
            <label className="block font-medium">Topic</label>
            <input
              type="text"
              name="topic"
              value={form.topic}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Level */}
          <div>
            <label className="block font-medium">Level</label>
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-lg"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Grade */}
          <div>
            <label className="block font-medium">Grade</label>
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-lg"
            >
              <option value="bachelors">Bachelors</option>
              <option value="masters">Masters</option>
              <option value="phd">PhD</option>
            </select>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block font-medium">Number of Questions</label>
            <input
              type="number"
              name="questions"
              value={form.questions}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-lg"
              min={1}
              required
            />
          </div>

          {/* Time Limit */}
          <div>
            <label className="block font-medium">Time Limit (in minutes)</label>
            <input
              type="number"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-lg"
              min={1}
              required
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="block font-medium">Optional Keywords (comma separated)</label>
            <input
              type="text"
              name="keywords"
              value={form.keywords}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-lg"
              placeholder="e.g., recursion, sorting"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium">Optional PDF or File</label>
            <input
              type="file"
              name="file"
              accept=".pdf,.txt,.docx"
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-lg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            🚀 Generate Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
