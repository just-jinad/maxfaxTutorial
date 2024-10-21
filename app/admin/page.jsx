"use client";
import { useState } from 'react';

export default function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]); // Array of questions
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('multiple-choice'); // Default type
  const [options, setOptions] = useState(''); // Options for multiple-choice questions
  const [timeframe, setTimeframe] = useState('');

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const newQuestion = { text: questionText, type: questionType };

    if (questionType === 'multiple-choice') {
      newQuestion.options = options.split(',').map(option => option.trim());
    }

    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setOptions('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/quiz/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, questions, timeframe }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create a New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="mb-4">
          <label className="block mb-2">
            Question Type:
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="open-ended">Open Ended</option>
            </select>
          </label>
        </div>
        <input
          type="text"
          placeholder="Question Text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {questionType === 'multiple-choice' && (
          <input
            type="text"
            placeholder="Options (comma-separated, e.g. A, B, C, D)"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        )}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          Add Question
        </button>
        <div>
          <h2 className="text-lg font-semibold mb-2">Questions:</h2>
          <ul className="list-disc pl-5 mb-4">
            {questions.map((question, index) => (
              <li key={index}>
                <span className="font-medium">{question.text} </span>
                <span className="text-gray-500">({question.type})</span>
                {question.type === 'multiple-choice' && question.options && (
                  <ul className="list-inside list-disc mt-1">
                    {question.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <input
          type="number"
          placeholder="Timeframe (in minutes)"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
}
