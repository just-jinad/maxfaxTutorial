"use client"; // Ensure this component runs on the client side
import { useEffect, useState } from 'react';

const QuizSubmissions = ({ quizId }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`/api/quiz/${quizId}/submissions`);
                if (!response.ok) {
                    throw new Error('Failed to fetch submissions');
                }
                const data = await response.json();
                setSubmissions(data);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [quizId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Quiz Submissions</h2>
            <ul>
                {submissions.length > 0 ? (
                    submissions.map((submission) => (
                        <li key={submission._id}>
                            Student Name: {submission.studentName || 'Unknown'} - Score: {submission.score || 'N/A'}
                        </li>
                    ))
                ) : (
                    <li>No submissions found for this quiz.</li>
                )}
            </ul>
        </div>
    );
};

export default QuizSubmissions;
