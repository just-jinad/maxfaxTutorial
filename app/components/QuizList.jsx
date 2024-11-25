// app/components/QuizList.js
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const QuizList = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch('/api/quiz/all', {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
      const data = await res.json();
      if (res.ok) setQuizzes(data.quizzes);
      else throw new Error(data.error || 'Failed to fetch quizzes');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleAction = async (url, method, successMessage, onSuccess) => {
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Cache-Control': 'no-store' },
      });
      if (!res.ok) throw new Error('Operation failed');
      toast.success(successMessage);
      onSuccess();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="quiz-list max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">All Quizzes</h2>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="quiz-item p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() =>
                  handleAction(
                    `/api/quiz/delete/${quiz._id}`,
                    'DELETE',
                    'Quiz deleted successfully',
                    () => setQuizzes((prev) => prev.filter((q) => q._id !== quiz._id))
                  )
                }
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => router.push(`/edit/${quiz._id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
        <button
          onClick={() =>
            handleAction(
              '/api/quiz/deleteAll',
              'DELETE',
              'All quizzes deleted successfully',
              () => setQuizzes([])
            )
          }
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Delete All Quizzes
        </button>
      </div>
    </div>
  );
};

export default QuizList;
