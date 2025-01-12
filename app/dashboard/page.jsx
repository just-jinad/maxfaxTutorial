"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import QuizForm from "../components/dashboard/QuizForm";
import Question from "../components/dashboard/Question";
import QuizSubmitButton from "../components/dashboard/QuizSubmitButton";
import QuizOptionsToggle from "../components/dashboard/QuizOptionsToggle";
import ToggleCheckbox from "../components/dashboard/ToggleCheckbox";
import Link from "next/link";

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
      console.log(data)
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
    <div className="p-4">
      <h1>Welcome to the dashboard</h1>
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
      {/* <QuizOptionsToggle
        optionRender={optionRender}
        setOptionRender={setOptionRender}
      /> */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={addQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        >
          Add Question
        </button>
        <QuizSubmitButton handleSubmit={handleSubmit} loading={loading} />

        <Link
          href="/result"
          className="px-4 py-2 bg-yellow-500 text-white rounded-md mb-4"
        >
          View Student Score
        </Link>
        <Link
          href="/admin"
          className="px-4 py-2 text-center bg-red-400 text-white rounded-md mb-4"
        >
          Edit/Delete
        </Link>
      </div>
      {generatedPin && (
        <div className="p-5 bg-green-400 font-bold text-white  mb-4">
          Generated PIN: {generatedPin}
        </div>
      )}
    </div>
  );
};

export default Page;
