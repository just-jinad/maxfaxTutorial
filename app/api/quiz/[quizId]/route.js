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
      showScoresImmediately: quiz.showScoresImmediately,
      optionRender: quiz.optionRender,
      questions: quiz.questions.map((question) => ({
        questionText: question.questionText,
        latexEquation: question.latexEquation,
        options: question.options,
        questionType: question.questionType,
        imageUrl: question.imageUrl,
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

    // Fetch the quiz to get correct answers and allowed attempts
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    // Check for existing submissions by this student for this quiz
    const studentSubmissions = await Submission.find({ quizId, studentName });
    const maxAttempts = quiz.maxAttempts || 1; // Assume a default of 1 if not specified

    if (studentSubmissions.length >= maxAttempts) {
      return NextResponse.json(
        { error: "You have reached the maximum number of attempts for this quiz." },
        { status: 403 }
      );
    }

    // Calculate score and determine correctness per question
    let score = 0;
    const results = quiz.questions.map((question, index) => {
      let isCorrect = false;

      if (question.questionType === "MCQ") {
        // Compare selected answer with the correct answer for MCQ questions
        isCorrect = selectedAnswers[index] === question.correctAnswer;
      } else if (question.questionType === "Theory") {
        // Compare Theory answers (case-insensitive and trim spaces)
        const studentAnswer = selectedAnswers[index]?.trim().toLowerCase() || "";
        const correctAnswer = question.correctAnswer?.trim().toLowerCase() || "";
        isCorrect = studentAnswer === correctAnswer;
      }

      if (isCorrect) score += 2; // 2 points per correct answer
      return {
        questionText: question.questionText,
        latexEquation: question.latexEquation,
        correctAnswer: question.correctAnswer,
        selectedAnswer: selectedAnswers[index],
        isCorrect,
      };
    });

    // Save the new submission to MongoDB
    const newSubmission = await Submission.create({
      studentName,
      score,
      quizId,
      attemptNumber: studentSubmissions.length + 1, // Track attempt number
    });
    console.log("New submission saved:", newSubmission);

    // Return the calculated score, results, and attempt status
    return NextResponse.json({
      message: "Quiz submitted successfully.",
      studentName,
      score,
      totalScore: quiz.questions.length * 2,
      results,
      remainingAttempts: maxAttempts - (studentSubmissions.length + 1), // Remaining attempts
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz." },
      { status: 500 }
    );
  }
}
