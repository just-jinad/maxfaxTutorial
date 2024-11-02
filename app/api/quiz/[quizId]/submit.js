import { NextResponse } from "next/server";
import { connect } from "@/app/utils/dbConnect";
import Quiz from "@/app/models/quiz";

export async function POST(request, { params }) {
    await connect();

    try {
        const { quizId } = params;
        const { selectedAnswers } = await request.json();

        // Fetch the quiz from the database
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
        }

        // Calculate score with 2 points for each correct answer
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                score += 2;  // Award 2 points for each correct answer
            }
        });

        return NextResponse.json({
            message: "Quiz submitted successfully.",
            score,  // Total score as a whole number
            totalQuestions: quiz.questions.length,
            totalPossibleScore: quiz.questions.length * 2,  // Maximum possible score
        });
    } catch (error) {
        console.error("Error submitting quiz:", error);
        return NextResponse.json({ error: "Failed to submit quiz." }, { status: 500 });
    }
}
