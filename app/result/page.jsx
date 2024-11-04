"use client"; // Ensure this component runs on the client side
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const QuizSubmissions = ({ quizId }) => {
    const router = useRouter()
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`/api/quiz/${quizId}/submissions`);
        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold mb-4 text-center">Quiz Submissions</h2>
      <ul className="space-y-3">
        {submissions.length > 0 ? (
          submissions.map((submission) => (
            <li
              key={submission._id}
              className="bg-white shadow-md rounded-lg p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <p className="font-semibold">
                Student Name:{" "}
                <span className="font-normal">
                  {submission.studentName || "Unknown"}
                </span>
              </p>
              <p className="text-gray-600">
                Score:{" "}
                <span className="font-bold text-green-500">
                  {submission.score || "N/A"}
                </span>
              </p>
            </li>
          ))
        ) : (
          <li className="bg-white shadow-md rounded-lg p-4 text-center">
            No submissions found for this quiz.
          </li>
        )}
      </ul>
    </div>
  );
};

export default QuizSubmissions;
