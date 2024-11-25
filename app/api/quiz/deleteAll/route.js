// app/api/quiz/deleteAll/route.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '../../../models/quiz';

export async function DELETE() {
    await connect();

    try {
        const result = await Quiz.deleteMany();
        console.log('All quizzes deleted:', result);

        return NextResponse.json(
            { message: "All quizzes deleted successfully!" },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store, max-age=0',
                },
            }
        );
    } catch (error) {
        console.error("Error deleting all quizzes:", error);
        return NextResponse.json(
            { error: "Failed to delete all quizzes." },
            { 
                status: 500,
                headers: {
                    'Cache-Control': 'no-store, max-age=0',
                },
            }
        );
    }
}

