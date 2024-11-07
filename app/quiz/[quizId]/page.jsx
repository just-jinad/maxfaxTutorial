"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const QuizPage = () => {
    const router = useRouter();
    const { quizId } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null); 
    const [studentName, setStudentName] = useState("");
    const [error, setError] = useState("");
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null); // Stores the student's score after submission

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`/api/quiz/${quizId}`);
                const data = await response.json();

                if (response.ok) {
                    setQuizData(data);
                    setRemainingTime(data.timeLimit * 60); 
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
        } else if (remainingTime === 0) {
          handleSubmit(); // Auto-submit when time is up
        }
      }, [remainingTime]);

      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
      };

    // Track answer selection
    const handleOptionChange = (questionIndex, option) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: option,
        }));
    };

    // Submit quiz and calculate score
    const handleSubmit = async () => {
        if (!studentName) {
            setError("Please enter your name before submitting the quiz.");
            return;
        }
        
        try {
            const response = await fetch(`/api/quiz/${quizId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Updated to send studentName instead of name
                body: JSON.stringify({ studentName, selectedAnswers }),
            });

            const result = await response.json();
            if (response.ok) {
                setScore(result.score); // Display the score to the student
            } else {
                setError(result.error || "Failed to submit quiz.");
            }
        } catch (error) {
            console.error("Error submitting quiz:", error);
            setError("An unexpected error occurred.");
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
                <h2 className="text-xl text-center text-gray-700 mb-6">Subject: {quizData.subject}</h2>
                <h2 className="text-center text-gray-700 mb-6">Time Remaining: {formatTime(remainingTime)}</h2>

                {/* Student Name Input */}
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

                {/* Quiz Questions */}
                {quizData.questions.map((question, index) => (
                    <div key={index} className="mb-6 p-4 bg-white rounded shadow">
                        <h2 className="font-semibold text-lg mb-2">{question.questionText}</h2>
                        <ul>
                            {question.options.map((option, i) => (
                                <li key={i} className="mt-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            checked={selectedAnswers[index] === option}
                                            onChange={() => handleOptionChange(index, option)}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Display Score or Submit Button */}
                {score !== null ? (
                    <p className="text-center text-xl font-semibold mt-4">
                        Your Score: {score} / {quizData.questions.length * 2} {/* Each question is worth 2 points */}
                    </p>
                ) : (
                    <button
                        className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
