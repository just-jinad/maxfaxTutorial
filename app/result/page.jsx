"use client";
import React, { useEffect, useState } from "react";

const AdminSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch("/api/quiz/result");

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.error || "Failed to load submissions.");
                    console.error("Fetch error:", errorData);
                    return;
                }

                const result = await response.json();
                console.log("Fetched data:", result);

                // Extract the submissions array from result.data
                setSubmissions(Array.isArray(result.data) ? result.data : []);
                
            } catch (error) {
                console.error("Error fetching submissions:", error);
                setError("An unexpected error occurred.");
            }
        };

        fetchSubmissions();
    }, []);

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <div className="max-w-lg mx-auto">
                <h1 className="text-3xl font-bold text-center mb-4">Quiz Submissions</h1>
                {submissions.length === 0 ? (
                    <p className="text-center">No submissions yet.</p>
                ) : (
                    <ul>
                        {submissions.map((submission, index) => (
                            <li key={index} className="mb-4 p-4 bg-white rounded shadow">
                                <p><strong>Name:</strong> {submission.studentName}</p>
                                <p><strong>Score:</strong> {submission.score}</p>
                                <p><strong>Timestamp:</strong> {new Date(submission.timestamp).toLocaleString()}</p>
                                <p><strong>Quiz:</strong> {submission.quizId?.title || 'N/A'}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdminSubmissions;
