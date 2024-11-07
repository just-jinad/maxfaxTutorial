import { NextResponse } from "next/server";
import { connect } from "@/app/utils/dbConnect";
import Quiz from "../../../models/quiz";
import Submission from "../../../models/submission";

// GET request to retrieve quiz data
export async function GET(request, { params }) {
  await connect();

  try {
    const { quizId } = params;

    // Fetch the quiz by ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    // Return quiz data without the correct answers
    return NextResponse.json({
      title: quiz.title,
      subject: quiz.subject,
      timeLimit: quiz.timeLimit,
      questions: quiz.questions.map((question) => ({
        questionText: question.questionText,
        options: question.options,
        questionType: question.questionType,
      })),
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz." },
      { status: 500 }
    );
  }
}

// POST request to submit answers and calculate score
export async function POST(request, { params }) {
  // Connect to the database
  await connect();

  try {
    const { quizId } = params;
    const { studentName, selectedAnswers } = await request.json();

    // Fetch the quiz to get correct answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    // Calculate score and determine correctness per question
    let score = 0;
    const results = quiz.questions.map((question, index) => {
      const isCorrect = selectedAnswers[index] === question.correctAnswer;
      if (isCorrect) score += 2; // 2 points per correct answer
      return {
        questionText: question.questionText,
        correctAnswer: question.correctAnswer,
        selectedAnswer: selectedAnswers[index],
        isCorrect,
      };
    });

    // Create and save the new submission to MongoDB
    const newSubmission = await Submission.create({
      studentName,
      score,
      quizId,
    });
    console.log("New submission saved:", newSubmission);

    // Return the calculated score, results, and detailed feedback
    return NextResponse.json({
      message: "Quiz submitted successfully.",
      studentName,
      score,
      totalScore: quiz.questions.length * 2,
      results,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz." },
      { status: 500 }
    );
  }
}
