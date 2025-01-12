import React from "react";

const QuizForm = ({
  quizTitle,
  setQuizTitle,
  subject,
  setSubject,
  timeLimit,
  setTimeLimit,
  attemptLimit,
  setAttemptLimit,
}) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="number"
        placeholder="Time Limit (minutes)"
        value={timeLimit}
        onChange={(e) => setTimeLimit(Number(e.target.value))}
        className="border p-2 w-full mb-4"
      />
      <input
        type="number"
        placeholder="Attempt Limit"
        value={attemptLimit}
        onChange={(e) => setAttemptLimit(Number(e.target.value))}
        className="border p-2 w-full"
      />
    </div>
  );
};

export default QuizForm;
