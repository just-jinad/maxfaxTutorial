"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import katex from "katex";
import "katex/dist/katex.min.css";
import Image from "next/image";

const QuizPage = () => {
  const router = useRouter();
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [showScoresImmediately, setShowScoresImmediately] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false); // Flag to track time-up

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quiz/${quizId}`);
        const data = await response.json();

        if (response.ok) {
          setQuizData(data);
          setRemainingTime(data.timeLimit * 60); // Convert minutes to seconds
          setRemainingAttempts(data.remainingAttempts);
          setShowScoresImmediately(data.showScoresImmediately);
        } else {
          setError(data.error || "Failed to load quiz data.");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setError("An unexpected error occurred.");
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (remainingTime === 0 && !isTimeUp) {
      setIsTimeUp(true);
      handleSubmit(); // Auto-submit when time runs out
    }
  }, [remainingTime, isTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };

  const handleTheoryAnswerChange = (questionIndex, value) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!studentName) {
      setError("Please enter your name before submitting the quiz.");
      return;
    }
    if (remainingAttempts <= 0) {
      setError("You have reached the maximum number of attempts for this quiz.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/quiz/${quizId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName, selectedAnswers }),
      });

      const result = await response.json();
      if (response.ok) {
        setScore(result.score);
        setResults(result.results);
        setRemainingAttempts(result.remainingAttempts);
      } else {
        setError(result.error || "Failed to submit quiz.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const renderLatex = (text) => {
    try {
      return katex.renderToString(text, { throwOnError: false });
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
      return text;
    }
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!quizData) {
    return <p className="text-center">Loading quiz...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">{quizData.title}</h1>
        <h2 className="text-xl text-center text-gray-700 mb-6">
          Subject: {quizData.subject}
        </h2>
        <h2 className="text-center text-gray-700 mb-6">
          Time Remaining: {formatTime(remainingTime)}
        </h2>
        <div className="text-center mb-4">
          <p className="text-gray-700 font-semibold">
            Remaining Attempts: {remainingAttempts}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="studentName">
            Enter your name:
          </label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {quizData.questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 bg-white rounded shadow">
            <span>{question.questionText}</span>
            <h2
              className="font-semibold text-lg mb-2"
              dangerouslySetInnerHTML={{
                __html: renderLatex(question.latexText),
              }}
            ></h2>

            {question.imageUrl && (
              <Image
                src={question.imageUrl}
                alt="Question Image"
                width={500}
                height={500}
                className="mb-4"
              />
            )}

            {question.questionType === "MCQ" ? (
              question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2">
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.content}
                      onChange={() => handleOptionChange(index, option.content)}
                      disabled={score !== null}
                    />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: option.type === "latex" ? renderLatex(option.content) : option.content,
                      }}
                    ></span>
                  </label>
                </div>
              ))
            ) : (
              <textarea
                value={selectedAnswers[index] || ""}
                onChange={(e) => handleTheoryAnswerChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                disabled={score !== null}
              />
            )}

            {/* Show Correct Answers only if not time-up */}
            {showScoresImmediately && results && !isTimeUp && (
              <div>
                <p>
                  <strong>Correct Answer: </strong>
                  {question.questionType === "MCQ"
                    ? question.options.find((option) => option.isCorrect)?.content
                    : question.correctAnswer}
                </p>
              </div>
            )}
          </div>
        ))}

        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading || remainingAttempts <= 0 || isTimeUp}
            className="px-6 py-2 bg-blue-500 text-white rounded-md"
          >
            {loading ? "Submitting..." : "Submit Quiz"}
          </button>
        </div>

        {score !== null && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Your Score: {score}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
