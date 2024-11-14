"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import katex from "katex";
import "katex/dist/katex.min.css";

const renderLatex = (text) => {
  return { __html: katex.renderToString(text, { throwOnError: false }) };
};

const Page = () => {
  const router = useRouter();
  const [quizTitle, setQuizTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [attemptLimit, setAttemptLimit] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [generatedPin, setGeneratedPin] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        questionType: "MCQ",
        options: ["", "", "", ""],
        correctAnswer: "",
        imageUrl: "",
      },
    ]);
  };

  
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Define handleImageUpload outside handleSubmit
  const handleImageUpload = async (qIndex, file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploading file:", file);

  
    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log(data) // shows the image url 

      if (response.ok) {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].imageUrl = data.imageUrl;
        setQuestions(updatedQuestions);
        console.log("Updated questions with image URL:", updatedQuestions);
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload error.");
    }
  };
  

  const handleSubmit = async () => {
    if (!quizTitle || !subject || questions.length === 0 || !timeLimit) {
      toast.error("Please fill in all fields and ensure questions are complete.", {
        position: "top-center",
        style: { backgroundColor: "red", color: "white" },
      });
      return;
    }

    const quizData = {
      title: quizTitle,
      subject,
      questions,
      timeLimit,
      attemptLimit,
    };

    console.log(quizData)

    setLoading(true);
    try {
      const response = await fetch("/api/quiz/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      const data = await response.json();
      console.log(data)
      console.log("Questions before submission:", questions);

      if (response.ok) {
        toast.success("Quiz created successfully!", {
          position: "top-center",
          style: { backgroundColor: "green", color: "white" },
        });
        setGeneratedPin(data.pin);

        // Reset form
        setQuizTitle("");
        setSubject("");
        setQuestions([]);
        setTimeLimit(0);
        setAttemptLimit(0);
      } else {
        toast.error(data.error || "Failed to create quiz.", {
          position: "top-center",
          style: { backgroundColor: "red", color: "white" },
        });
      }
    } catch (error) {
      toast.error("Failed to create quiz due to a server error.", {
        position: "top-center",
        style: { backgroundColor: "red", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create a New Quiz</h1>
      <input
        type="text"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="border p-2 mb-4 w-full rounded-md"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 mb-4 w-full rounded-md"
      />
      <input
        type="number"
        placeholder="Time Limit (in minutes)"
        value={timeLimit}
        onChange={(e) => setTimeLimit(e.target.value)}
        className="border p-2 mb-4 w-full rounded-md"
      />
      <input
        type="number"
        placeholder="Attempt Limit (e.g., 3)"
        value={attemptLimit}
        onChange={(e) => setAttemptLimit(e.target.value)}
        className="border p-2 mb-4 w-full rounded-md"
      />

      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-6 p-4 border rounded-md">
          <input
            type="text"
            placeholder="Question Text (supports LaTeX)"
            value={question.questionText}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionText", e.target.value)
            }
            className="border p-2 mb-4 w-full"
          />
          <p
            dangerouslySetInnerHTML={renderLatex(question.questionText)}
            className="katex-preview"
          ></p>

          <select
            value={question.questionType}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionType", e.target.value)
            }
            className="border p-2 mb-4 w-full"
          >
            <option value="MCQ">Multiple Choice</option>
            <option value="Theory">Theory</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(qIndex, e.target.files[0])}
            className="mb-2"
          />
          {question.imageUrl && (
            <img src={question.imageUrl} alt="Uploaded" className="w-full h-auto mt-2" />
          )}

          {question.questionType === "MCQ" &&
            question.options.map((option, optIndex) => (
              <div key={optIndex}>
                <input
                  type="text"
                  placeholder={`Option ${optIndex + 1} (supports LaTeX)`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(qIndex, optIndex, e.target.value)
                  }
                  className="border p-2 mb-2 w-full"
                />
                <p
                  dangerouslySetInnerHTML={renderLatex(option)}
                  className="katex-preview"
                ></p>
              </div>
            ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) =>
              handleQuestionChange(qIndex, "correctAnswer", e.target.value)
            }
            className="border p-2 mb-4 w-full"
          />
        </div>
      ))}

      <button onClick={addQuestion} className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4">
        Add Question
      </button>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded-md mb-4"
        disabled={loading}
      >
        {loading ? "Creating Quiz..." : "Submit Quiz"}
      </button>

      <Link href="/result">
        <span className="px-4 text-center py-2 bg-yellow-400 text-white rounded-md mb-4">
          View scores
        </span>
      </Link>

      {loading && (
        <div className="flex items-center justify-center mt-4">
          <div className="loader"></div>
        </div>
      )}

      {generatedPin && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700">
          Quiz created successfully! PIN for quiz: {generatedPin}
        </div>
      )}
    </div>
  );
};

export default Page;
