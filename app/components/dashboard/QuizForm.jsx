import React from "react";

const QuizForm = ({
  quizTitle,
  setQuizTitle,
  subject,
  setSubject,
  timeLimit,
  setTimeLimit,
  attemptLimit,
  setAttemptLimit
}) => (
  <div className="mb-6">
    <input
      type="text"
      placeholder="Quiz Title"
      value={quizTitle}
      onChange={(e) => setQuizTitle(e.target.value)}
      className="border p-2 mb-4 w-full rounded-md"
    />
    <input
      type="text"
      placeholder="Subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      className="border p-2 mb-4 w-full rounded-md"
    />
    <input
      type="number"
      placeholder="Time Limit (in minutes)"
      value={timeLimit}
      onChange={(e) => setTimeLimit(e.target.value)}
      className="border p-2 mb-4 w-full rounded-md"
    />
    <input
      type="number"
      placeholder="Attempt Limit (e.g., 3)"
      value={attemptLimit}
      onChange={(e) => setAttemptLimit(e.target.value)}
      className="border p-2 mb-4 w-full rounded-md"
    />
  </div>
);

export default QuizForm;
