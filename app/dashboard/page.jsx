"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  // Add new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        questionType: "MCQ", // Default type is MCQ
        options: ["", "", "", ""], // Four default options for MCQ
        correctAnswer: "",
      },
    ]);
  };

  // Handle changes in question fields
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle changes in options
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Submit quiz data to the backend
  const handleSubmit = async () => {
    const quizData = { title: quizTitle, questions };
    try {
      const response = await fetch("/api/quiz/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      const data = await response.json();
      if (response.ok) alert("Quiz created successfully!");
      else console.error("Error:", data.error);
    } catch (error) {
      console.error("Failed to create quiz:", error);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or any setup tasks
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this delay as needed

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="loader mb-4 border-4 border-blue-600 border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Welcome to the Maxfax Dashboard
      </h1>
      <h1 className="text-2xl font-bold mb-4">Create a New Quiz</h1>

      {/* Quiz Title */}
      <input
        type="text"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {/* Questions */}
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6 p-4 border rounded-md">
          <input
            type="text"
            placeholder="Question Text"
            value={question.questionText}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionText", e.target.value)
            }
            className="border p-2 mb-4 w-full"
          />

          {/* Question Type */}
          <select
            value={question.questionType}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionType", e.target.value)
            }
            className="border p-2 mb-4 w-full"
          >
            <option value="MCQ">Multiple Choice</option>
            <option value="Theory">Theory</option>
          </select>

          {/* Options (Only show if question type is MCQ) */}
          {question.questionType === "MCQ" &&
            question.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(qIndex, optIndex, e.target.value)
                }
                className="border p-2 mb-2 w-full"
              />
            ))}

          {/* Correct Answer */}
          <input
            type="text"
            placeholder="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) =>
              handleQuestionChange(qIndex, "correctAnswer", e.target.value)
            }
            className="border p-2 mb-4 w-full"
          />
        </div>
      ))}

      {/* Add Question Button */}
      <button
        onClick={addQuestion}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
      >
        Add Question
      </button>

      {/* Submit Quiz Button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default Page;
