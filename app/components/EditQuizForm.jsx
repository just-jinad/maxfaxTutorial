"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EditQuizForm = ({ id }) => {
  const [quizData, setQuizData] = useState({
    title: "",
    subject: "",
    timeLimit: "",
    attemptLimit: 1,
    questions: [],
  });

  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchQuizData(id); // Fetch quiz details when ID is available
    }
  }, [id]);

  const fetchQuizData = async (quizId) => {
    try {
      const res = await fetch(`/api/quiz/edit/${quizId}`);

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data = await res.json();

      if (data.updatedQuiz) {
        setQuizData(data.updatedQuiz); // Include questions in quizData
      } else {
        toast.error("Quiz data not found");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error fetching quiz data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/quiz/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });
      const data = await res.json();
      if (data.updatedQuiz) {
        toast.success("Quiz updated successfully!");
        router.push("/quiz/list"); // Redirect to the quiz list page
      } else {
        toast.error("Failed to update quiz");
      }
    } catch (error) {
      toast.error("Error updating quiz");
    }
  };

  const handleChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Edit Quiz
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Title:</label>
              <input
                type="text"
                name="title"
                value={quizData.title}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Subject:</label>
              <input
                type="text"
                name="subject"
                value={quizData.subject}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Time Limit (minutes):
              </label>
              <input
                type="number"
                name="timeLimit"
                value={quizData.timeLimit}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Attempt Limit:
              </label>
              <input
                type="number"
                name="attemptLimit"
                value={quizData.attemptLimit}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Edit Questions</h3>
            {quizData.questions.map((question, index) => (
              <div key={index} className="border p-4 rounded-md space-y-2">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">Question:</label>
                  <input
                    type="text"
                    name={`questionText-${index}`}
                    value={question.questionText || ""}
                    onChange={(e) => {
                      const updatedQuestions = [...quizData.questions];
                      updatedQuestions[index].questionText = e.target.value;
                      setQuizData({ ...quizData, questions: updatedQuestions });
                    }}
                    required
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* LaTeX Equation Input */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">LaTeX Equation:</label>
                  <input
                    type="text"
                    name={`latexEquation-${index}`}
                    value={question.latexEquation || ""}
                    onChange={(e) => {
                      const updatedQuestions = [...quizData.questions];
                      updatedQuestions[index].latexEquation = e.target.value;
                      setQuizData({ ...quizData, questions: updatedQuestions });
                    }}
                    required
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">Options:</label>
                  <textarea
                    name={`options-${index}`}
                    value={question.options ? question.options.join("\n") : ""}
                    onChange={(e) => {
                      const updatedQuestions = [...quizData.questions];
                      updatedQuestions[index].options = e.target.value.split("\n");
                      setQuizData({ ...quizData, questions: updatedQuestions });
                    }}
                    required
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium mb-1">Correct Answer:</label>
                  <input
                    type="text"
                    name={`correctAnswer-${index}`}
                    value={question.correctAnswer || ""}
                    onChange={(e) => {
                      const updatedQuestions = [...quizData.questions];
                      updatedQuestions[index].correctAnswer = e.target.value;
                      setQuizData({ ...quizData, questions: updatedQuestions });
                    }}
                    required
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Update Quiz
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditQuizForm;
