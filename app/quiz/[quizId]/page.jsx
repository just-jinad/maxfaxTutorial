"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const QuizPage = () => {
    const { quizId } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await fetch(`/api/quiz/${quizId}`);
                const data = await response.json();
                
                if (response.ok) {
                    setQuizData(data);
                } else {
                    setError(data.error || "Failed to load quiz.");
                }
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setError("An unexpected error occurred.");
            }
        };

        fetchQuiz();
    }, [quizId]);

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    if (!quizData) {
        return <p className="text-center">Loading quiz...</p>;
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-center mb-6">{quizData.title}</h1>
            {quizData.questions.map((question, index) => (
                <div key={index} className="mb-6 p-4 bg-white rounded shadow">
                    <h2 className="font-semibold text-lg mb-2">{question.text}</h2>
                    <ul>
                        {question.options.map((option, i) => (
                            <li key={i} className="mt-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            {/* Add submit button and handling here */}
        </div>
    );
};

export default QuizPage;
