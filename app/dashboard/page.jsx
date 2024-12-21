"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import QuizForm from "../components/dashboard/QuizForm";
import Question from "../components/dashboard/Question";
import QuizSubmitButton from "../components/dashboard/QuizSubmitButton";
import katex from "katex";
import "katex/dist/katex.min.css";
import Link from "next/link";

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
  const [loading, setLoading] = useState(false);
  const [generatedPin, setGeneratedPin] = useState("");

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
        latexEquation:"",
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

  const handleImageUpload = async (qIndex, file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].imageUrl = data.url;
        setQuestions(updatedQuestions);
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      toast.error("Image upload error.");
    }
  };

  const handleSubmit = async () => {
    if (!quizTitle || !subject || questions.length === 0 || !timeLimit) {
      toast.error(
        "Please fill in all fields and ensure questions are complete."
      );
      return;
    }
    const quizData = {
      title: quizTitle,
      subject,
      questions,
      timeLimit,
      attemptLimit,
    };

    setLoading(true);
    try {
      const response = await fetch("/api/quiz/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Quiz created successfully!");
        setGeneratedPin(data.pin);
        setQuizTitle("");
        setSubject("");
        setQuestions([]);
        setTimeLimit(0);
        setAttemptLimit(0);
      } else {
        toast.error(data.error || "Failed to create quiz.", {
          position:"top-center",
          style: {backgroundColor:"green", color:"white"}
        });
      }
    } catch (error) {
      toast.error("Error creating quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 g">
      <div>Welcome to the dashboard</div>
      <QuizForm
        quizTitle={quizTitle}
        setQuizTitle={setQuizTitle}
        subject={subject}
        setSubject={setSubject}
        timeLimit={timeLimit}
        setTimeLimit={setTimeLimit}
        attemptLimit={attemptLimit}
        setAttemptLimit={setAttemptLimit}
      />
      {questions.map((question, index) => (
        <Question
          key={index}
          question={question}
          index={index}
          handleQuestionChange={handleQuestionChange}
          handleOptionChange={handleOptionChange}
          handleImageUpload={handleImageUpload}
        />
      ))}

      <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-3">
        
      
      <button
        onClick={addQuestion}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
      >
        Add Question
      </button>
      <QuizSubmitButton handleSubmit={handleSubmit} loading={loading} />
      {generatedPin && (
        <div className="mt-4 p-2 bg-green-100 rounded-md">
          <p>Your quiz PIN: {generatedPin}</p>
        </div>
      )}
      <button className="px-4 py-2 bg-yellow-500 text-white rounded-md mb-4">
      <Link href="/result">
        view student score
      </Link>
      </button>
      <button className="px-4 py-2 bg-red-400 text-white rounded-md mb-4">
        <Link href="/admin">
        Edit/Delete
        </Link>
      </button>
      </div>
    </div>
  );
};

export default Page;
