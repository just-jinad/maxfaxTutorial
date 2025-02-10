"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CalendarIcon,
  Settings,
  Bell,
  Search,
  PlusCircle,
} from "lucide-react";

// Existing component imports remain unchanged
import QuizForm from "../components/dashboard/QuizForm";
import Question from "../components/dashboard/Question";
import QuizSubmitButton from "../components/dashboard/QuizSubmitButton";
import QuizOptionsToggle from "../components/dashboard/QuizOptionsToggle";
import ToggleCheckbox from "../components/dashboard/ToggleCheckbox";
import Link from "next/link";

const Page = () => {
  // Entire existing component logic remains EXACTLY the same
  const router = useRouter();
  const [quizTitle, setQuizTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [attemptLimit, setAttemptLimit] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generatedPin, setGeneratedPin] = useState("");
  const [showScoresImmediately, setShowScoresImmediately] = useState(false);
  const [optionRender, setOptionRender] = useState(false);

  // All existing methods (useEffect, addQuestion, handleQuestionChange, etc.) remain unchanged
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
        latexEquation: "",
        questionType: "MCQ",
        options: [
          { content: "", type: "plain", isCorrect: false },
          { content: "", type: "plain", isCorrect: false },
        ],
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

  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push({
      content: "",
      type: "plain",
      isCorrect: false,
    });
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[qIndex].options.length > 2) {
      updatedQuestions[qIndex].options.splice(optIndex, 1);
      setQuestions(updatedQuestions);
    } else {
      toast.error("A question must have at least two options.");
    }
  };

  const handleOptionChange = (qIndex, optIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleImageUpload = async (qIndex, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    try {
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("image link " + data.url);
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].imageUrl = data.url;
        setQuestions(updatedQuestions);
        toast.success("Image uploaded successfully.");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("An error occurred while uploading the image.");
    }
  };

  const handleSubmit = async () => {
    if (!quizTitle || !subject || questions.length === 0) {
      toast.error(
        "Please fill in all required fields and add at least one question."
      );
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: quizTitle,
          subject,
          questions,
          attemptLimit,
          timeLimit,
          showScoresImmediately,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedPin(data.pin); // Access the pin here from the response

        toast.success("Quiz created successfully!");
        setQuizTitle("");
        setSubject("");
        setQuestions([]);
        setAttemptLimit(0);
        setTimeLimit(0);
        setShowScoresImmediately(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create the quiz.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar */}
      <aside className="w-24 bg-purple-600 text-white p-4 flex flex-col items-center">
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-8 h-8"
          >
            <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 9.305a.75.75 0 01-.657 1.048h-9.23a.75.75 0 01-.571-.302c-1.757-2.251-3.846-4.01-6.124-5.126a.75.75 0 01.357-1.424zM14.25 12.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3.75a.75.75 0 00-.75-.75h-3z" />
          </svg>
        </div>
        <nav className="space-y-6">
          <button className="text-white hover:bg-purple-700 p-2 rounded">
            <LayoutDashboard size={20} />
          </button>
          <button className="text-white hover:bg-purple-700 p-2 rounded">
            <BookOpen size={20} />
          </button>
          <button className="text-white hover:bg-purple-700 p-2 rounded">
            <Users size={20} />
          </button>
          <button className="text-white hover:bg-purple-700 p-2 rounded">
            <CalendarIcon size={20} />
          </button>
          <button className="text-white hover:bg-purple-700 p-2 rounded">
            <Settings size={20} />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Quiz Creation Dashboard</h1>
            <p className="text-gray-600">Create and manage your quizzes</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Quizzes..."
                className="pl-10 pr-4 py-2 rounded-full w-64 border"
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
            </div>
            <button className="bg-white p-2 rounded-full relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
                3
              </span>
            </button>
            <div className="w-10 h-10 bg-purple-200 rounded-full"></div>
          </div>
        </div>

        {/* Original Dashboard Content - EXACTLY as it was */}
        <div className="space-y-6">
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
              handleAddOption={handleAddOption}
              handleRemoveOption={handleRemoveOption}
              handleImageUpload={handleImageUpload}
            />
          ))}
          <ToggleCheckbox
            checked={showScoresImmediately}
            setChecked={setShowScoresImmediately}
            label="Allow students to see their answers immediately after submitting"
          />
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={addQuestion}
              className="px-4 py-2 bg-purple-600 text-white rounded-md mb-4"
            >
              Add Question
            </button>
            <QuizSubmitButton handleSubmit={handleSubmit} loading={loading} />

            <Link
              href="/result"
              className="px-4 py-2 bg-white text-purple-400 hover:bg-purple-400 hover:text-white font-bold rounded-md mb-4 text-center"
            >
              View Student Score
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 text-center  bg-white text-purple-400 hover:bg-purple-400 hover:text-white font-bold rounded-md mb-4"
            >
              Edit/Delete
            </Link>
          </div>
          {generatedPin && (
            <div className="p-5 bg-purple-500 font-bold text-white mb-4 rounded-md">
              Generated PIN: {generatedPin}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
