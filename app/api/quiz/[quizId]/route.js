import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '../../../models/quiz';

export async function GET(request, { params }) {
    await connect();

    try {
        const { quizId } = params;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
        }

        return NextResponse.json({
            title: quiz.title,
            subject: quiz.subject, // Include subject here
            questions: quiz.questions.map(q => ({
                questionText: q.questionText, // Use correct field name
                options: q.options,
                questionType: q.questionType, // Optionally include type
            }))
        });
    } catch (error) {
        console.error("Error fetching quiz:", error);
        return NextResponse.json({ error: "Failed to fetch quiz." }, { status: 500 });
    }
}
