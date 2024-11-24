// app/quiz/edit/[id]/page.js
"use client";
import EditQuizForm from "@/app/components/EditQuizForm";
import { useParams } from "next/navigation"; // Hook to extract dynamic route parameters
import React from "react";

const EditQuizPage = () => {
  const params = useParams(); // Get the dynamic route params
  const quizId = params.id; // Extract the 'id' from the route

  return (
    <div>
      <EditQuizForm id={quizId} />
    </div>
  );
};

export default EditQuizPage;
