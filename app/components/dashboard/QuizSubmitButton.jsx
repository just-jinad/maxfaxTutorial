import React from "react";

const QuizSubmitButton = ({ handleSubmit, loading }) => (
  <button
    onClick={handleSubmit}
    className="px-4 py-2 bg-green-500 text-white rounded-md mb-4"
    disabled={loading}
  >
    {loading ? "Creating Quiz..." : "Submit Quiz"}
  </button>
);

export default QuizSubmitButton;
