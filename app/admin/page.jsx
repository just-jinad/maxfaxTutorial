"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchQuizzes();
    }
  }, [router]);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quiz/getAll', { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data);
      } else {
        console.error("Failed to fetch quizzes");
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz Admin Dashboard</h1>
      <button 
        onClick={fetchQuizzes} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600 transition-colors duration-300 block mx-auto"
      >
        Refresh Quizzes
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">PIN</th>
              <th className="py-2 px-4 border">Questions</th>
              <th className="py-2 px-4 border">Attempt Limit</th>
              <th className="py-2 px-4 border">Time Limit</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz._id} className="border-b">
                <td className="py-2 px-4">{quiz.title}</td>
                <td className="py-2 px-4">{quiz.subject}</td>
                <td className="py-2 px-4">{quiz.pin}</td>
                <td className="py-2 px-4">{quiz.questions.length}</td>
                <td className="py-2 px-4">{quiz.attemptLimit}</td>
                <td className="py-2 px-4">{quiz.timeLimit} minutes</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

