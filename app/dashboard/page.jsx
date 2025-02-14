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
  Menu, // Hamburger icon for mobile
  X,    // Close icon for mobile sidebar
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Existing component imports remain unchanged
import QuizForm from "../components/dashboard/QuizForm";
import Question from "../components/dashboard/Question";
import QuizSubmitButton from "../components/dashboard/QuizSubmitButton";
import QuizOptionsToggle from "../components/dashboard/QuizOptionsToggle";
import ToggleCheckbox from "../components/dashboard/ToggleCheckbox";

// -------------------------
// Real Calendar Component
// -------------------------
const RealCalendar = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-bold mb-4">Calendar</h2>
      <Calendar onChange={setDate} value={date} className="w-full" />
    </div>
  );
};

// -------------------------
// Sample Data for Recharts
// -------------------------
const sampleData = [
  { name: "Quiz 1", submissions: 30 },
  { name: "Quiz 2", submissions: 50 },
  { name: "Quiz 3", submissions: 40 },
  { name: "Quiz 4", submissions: 70 },
  { name: "Quiz 5", submissions: 20 },
];

const Page = () => {
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

  // State to toggle the mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].imageUrl = data.url;
        setQuestions(updatedQuestions);
        toast.success("Image uploaded successfully.",{
          position: "top-center"
        });
      } else {
        toast.error("Failed to upload image.", {
          position: "top-center"
        });
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("An error occurred while uploading the image.");
    }
  };

  const handleSubmit = async () => {
    if (!quizTitle || !subject || questions.length === 0) {
      toast.error("Please fill in all required fields and add at least one question.",{
        position:"top-center"
      });
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
        setGeneratedPin(data.pin);
        toast.success("Quiz created successfully!",{
          position:"top-center"
        });
        setQuizTitle("");
        setSubject("");
        setQuestions([]);
        setAttemptLimit(0);
        setTimeLimit(0);
        setShowScoresImmediately(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create the quiz.",{
          position:"top-center"
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-purple-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <aside className="relative z-50 w-64 bg-purple-600 text-white p-4">
            <div className="flex justify-end mb-4">
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-6">
              <button className="flex items-center space-x-2 text-white hover:bg-purple-700 p-2 rounded w-full">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:bg-purple-700 p-2 rounded w-full">
                <BookOpen size={20} />
                <span>Quizzes</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:bg-purple-700 p-2 rounded w-full">
                <Users size={20} />
                <span>Users</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:bg-purple-700 p-2 rounded w-full">
                <CalendarIcon size={20} />
                <span>Calendar</span>
              </button>
              <button className="flex items-center space-x-2 text-white hover:bg-purple-700 p-2 rounded w-full">
                <Settings size={20} />
                <span>Settings</span>
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-24 bg-purple-600 text-white p-4 items-center">
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
          <button className="relative group text-white hover:bg-purple-700 p-2 rounded">
            <LayoutDashboard size={20} />
            <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white p-1 rounded text-xs">
              Dashboard
            </span>
          </button>
          <button className="relative group text-white hover:bg-purple-700 p-2 rounded">
            <BookOpen size={20} />
            <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white p-1 rounded text-xs">
              Quizzes
            </span>
          </button>
          <button className="relative group text-white hover:bg-purple-700 p-2 rounded">
            <Users size={20} />
            <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white p-1 rounded text-xs">
              Users
            </span>
          </button>
          <button className="relative group text-white hover:bg-purple-700 p-2 rounded">
            <CalendarIcon size={20} />
            <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white p-1 rounded text-xs">
              Calendar
            </span>
          </button>
          <button className="relative group text-white hover:bg-purple-700 p-2 rounded">
            <Settings size={20} />
            <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white p-1 rounded text-xs">
              Settings
            </span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-4">
  <div className="flex items-center justify-between sm:space-x-6 w-full sm:w-auto">
    {/* Hamburger Menu for Mobile */}
    <button
      className="md:hidden p-2 bg-purple-600 text-white rounded"
      onClick={() => setSidebarOpen(true)}
    >
      <Menu size={24} />
    </button>
    <div className="text-center sm:text-left w-full sm:w-auto">
      <h1 className="text-xl font-bold">Quiz Creation Dashboard</h1>
      <p className="text-gray-600 sm:text-lg">Create and manage your quizzes</p>
    </div>
  </div>

  <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-6 mt-4 sm:mt-0 w-full sm:w-auto">
    <div className="relative flex-grow sm:w-64">
      <input
        type="text"
        placeholder="Search Quizzes..."
        className="pl-10 pr-4 py-2 rounded-full w-full border"
      />
      <Search className="absolute left-3 top-3 text-gray-400" size={20} />
    </div>
    <button className="bg-white p-2 rounded-full relative">
      <Bell size={20} />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
        3
      </span>
    </button>
    <div className="w-10 h-10 bg-purple-200 rounded-full"></div>
  </div>
</header>


        {/* Calendar & Chart Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <RealCalendar />
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-bold mb-4">Quiz Submissions Chart</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={sampleData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="submissions" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Original Dashboard Content */}
        <section className="space-y-6">
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
              className="px-4 py-2 text-center bg-white text-purple-400 hover:bg-purple-400 hover:text-white font-bold rounded-md mb-4"
            >
              Edit/Delete
            </Link>
          </div>
          {generatedPin && (
            <div className="p-5 bg-purple-500 font-bold text-center text-white mb-4 rounded-md">
              Generated PIN: {generatedPin}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Page;
