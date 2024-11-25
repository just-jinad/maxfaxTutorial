import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const QuizList = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!token){
      router.push("/login");
    }
  }, [router])
  

  // Fetch quizzes from backend
  const fetchQuizzes = async () => {
    try {
      const res = await fetch('/api/quiz/all');
      const data = await res.json();

      if (data.quizzes) {
        setQuizzes(data.quizzes);
      } else {
        toast.error('Failed to load quizzes', {
          position: "top-center"
        });
      }
    } catch (error) {
      toast.error('Error fetching quizzes',{
        position:"top-center",
        style:{backgroundColor:"red", color:"white"}
      });
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const deleteQuiz = async (id) => {
      console.log(id)
    try {
      const res = await fetch(`/api/quiz/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      
      if (data.message) {
        toast.success("Delete successful", {
          position: "top-center",
          style: { backgroundColor: "green", color: "white" },
        });
        console.log("quiz has been deleted")
        fetchQuizzes(); // Refresh the list
      } else {
        toast.error('Failed to delete quiz', {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error('Error deleting quiz', {
        position: "top-center"
      });
    }
  };

  const deleteAllQuizzes = async () => {
    try {
      const res = await fetch('/api/quiz/deleteAll', {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.message) {
        toast.success('All quizzes deleted successfully!',{
          position:"top-center",
          style:{ backgroundColor: "green", color: "white" },
        });
        setQuizzes([]); // Clear the list of quizzes
      } else {
        toast.error('Failed to delete all quizzes',{
          position:"top-center"
        });
      }
    } catch (error) {
      toast.error('Error deleting all quizzes', {
        position:"top-center"
      });
    }
  };

  const editQuiz = (id) => {
    router.push(`/edit/${id}`)
    console.log('Edit quiz with ID:', id);
  };

  return (
    <div className="quiz-list max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">All Quizzes</h2>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="quiz-item p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
              <p className="text-sm text-gray-600">Attempts Left: {quiz.attemptLimit}</p>
              <p className="text-sm text-gray-600">Time Limit: {quiz.timeLimit} mins</p>
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => deleteQuiz(quiz._id)}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => editQuiz(quiz._id)}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
        <button
          onClick={deleteAllQuizzes}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Delete All Quizzes
        </button>
      </div>
    </div>
  );
};

export default QuizList;
