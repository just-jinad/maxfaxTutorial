import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '../../../models/quiz';
import Submission from '../../../models/submission';

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
            questions: quiz.questions.map((question) => ({
                questionText: question.questionText,
                options: question.options,
                questionType: question.questionType,
            }))
        });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        return NextResponse.json({ error: "Failed to fetch quiz." }, { status: 500 });
    }
}

// POST request to submit answers and calculate score
const submissions = [];
export async function POST(request, { params }) {
    await connect();

    try {
        const { quizId } = params;
        const { studentName, selectedAnswers } = await request.json();

        // Fetch the quiz to get correct answers
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
        }

        // Calculate score: 2 points per correct answer
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                score += 2;
            }
        });

        // Store the submission in the database
        const newSubmission = new Submission({ studentName, score, quizId });
        await newSubmission.save(); // Save to MongoDB

        // Return calculated score without saving it
        return NextResponse.json({
            message: "Quiz submitted successfully.",
            studentName,
            score,
            totalScore: quiz.questions.length * 2,
        });
    } catch (error) {
        console.error("Error submitting quiz:", error);
        return NextResponse.json({ error: "Failed to submit quiz." }, { status: 500 });
    }
}