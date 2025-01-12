import { NextResponse } from "next/server";
import { connect } from "@/app/utils/dbConnect";
import Quiz from "../../../models/quiz";
import Submission from "../../../models/submission";

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
    const quizData = {
      title: quiz.title,
      subject: quiz.subject,
      timeLimit: quiz.timeLimit,
      showScoresImmediately: quiz.showScoresImmediately,
      questions: quiz.questions.map((question) => ({
        questionText: question.questionText,
        latexText: question.latexText, // Include latexText for proper rendering
        options: question.options,  // Include options as they are
        questionType: question.questionType, // Ensure the type is included
        imageUrl: question.imageUrl,
      })),
    };

    return NextResponse.json(quizData);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz." },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  await connect();

  try {
    const { quizId } = params;
    const { studentName, selectedAnswers } = await request.json();

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    const studentSubmissions = await Submission.find({ quizId, studentName });
    const maxAttempts = quiz.maxAttempts || 1;

    if (studentSubmissions.length >= maxAttempts) {
      return NextResponse.json(
        { error: "You have reached the maximum number of attempts for this quiz." },
        { status: 403 }
      );
    }

    let score = 0;
    const results = quiz.questions.map((question, index) => {
      let isCorrect = false;

      if (question.questionType === "MCQ") {
        const selectedOption = question.options.find(
          (option) => option.content === selectedAnswers[index]
        );
        if (selectedOption && selectedOption.isCorrect) {
          isCorrect = true;
          score += 2; // Increment score for correct MCQ answers
        }
      } else if (question.questionType === "Theory") {
        const studentAnswer = selectedAnswers[index]?.trim().toLowerCase() || "";
        const correctAnswer = question.correctAnswer?.trim().toLowerCase() || "";
        isCorrect = studentAnswer === correctAnswer;

        if (isCorrect) score += 2; // Increment score for correct theory answers
      }

      return {
        questionText: question.questionText,
        latexText: question.latexText,
        correctAnswer: question.correctAnswer,
        selectedAnswer: selectedAnswers[index],
        isCorrect,
      };
    });

    const newSubmission = await Submission.create({
      studentName,
      score,
      quizId,
      attemptNumber: studentSubmissions.length + 1,
    });

    const response = {
      message: "Quiz submitted successfully.",
      studentName,
      score,
      totalScore: quiz.questions.length * 2,
      results,
      remainingAttempts: maxAttempts - (studentSubmissions.length + 1),
    };

    if (quiz.showScoresImmediately) {
      response.correctAnswers = quiz.questions.map((question) => ({
        correctAnswer: question.correctAnswer,
        options: question.options,
      }));
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz." },
      { status: 500 }
    );
  }
}
