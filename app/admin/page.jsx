"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditQuizModal from '../components/EditQuizModal';

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingQuiz, setEditingQuiz] = useState(null);
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
        headers: {
          'Cache-Control': 'no-store', // Prevent caching by browser
        }
      });
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data);
      } else {
        alert("Failed to fetch quizzes.");
      }
    } catch (error) {
      alert("Error fetching quizzes.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        const response = await fetch(`/api/quiz/delete/${id}`, { method: 'DELETE' });
        if (response.ok) {
          alert("Quiz deleted successfully.");
          fetchQuizzes();
        } else {
          alert("Failed to delete quiz.");
        }
      } catch (error) {
        alert("Error deleting quiz.");
      }
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all quizzes? This action cannot be undone.")) {
      try {
        const response = await fetch('/api/quiz/deleteAll', { method: 'DELETE' });
        if (response.ok) {
          alert("All quizzes deleted successfully.");
          fetchQuizzes();
        } else {
          alert("Failed to delete all quizzes.");
        }
      } catch (error) {
        alert("Error deleting all quizzes.");
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`/api/quiz/edit/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEditingQuiz(data.updatedQuiz);
      } else {
        alert("Failed to fetch quiz for editing.");
      }
    } catch (error) {
      alert("Error fetching quiz for editing.");
    }
  };

  const handleUpdate = async (updatedQuiz) => {
    try {
      const response = await fetch(`/api/quiz/edit/${updatedQuiz._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuiz),
      });

      if (response.ok) {
        alert("Quiz updated successfully.");
        setEditingQuiz(null);
        fetchQuizzes();
      } else {
        alert("Failed to update quiz.");
      }
    } catch (error) {
      alert("Error updating quiz.");
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz Admin Dashboard</h1>
      <button 
        onClick={handleDeleteAll} 
        className="bg-red-500 text-white px-4 py-2 rounded mb-6 hover:bg-red-600 transition-colors duration-300 block mx-auto"
      >
        Delete All Quizzes
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div 
            key={quiz._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
              <p className="text-gray-600 mb-2">Subject: {quiz.subject}</p>
              <p className="text-gray-600 mb-2">PIN: {quiz.pin}</p>
              <p className="text-gray-600 mb-2">Questions: {quiz.questions.length}</p>
              <p className="text-gray-600 mb-2">Attempt Limit: {quiz.attemptLimit}</p>
              <p className="text-gray-600 mb-4">Time Limit: {quiz.timeLimit} minutes</p>
              <div className="flex justify-between">
                <button 
                  onClick={() => handleEdit(quiz._id)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(quiz._id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editingQuiz && (
        <EditQuizModal
          quiz={editingQuiz}
          onClose={() => setEditingQuiz(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}