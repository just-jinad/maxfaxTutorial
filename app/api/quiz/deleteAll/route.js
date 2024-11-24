// app/api/quiz/deleteAll/route.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '../../../models/quiz';

export async function DELETE() {
    await connect();

    try {
        // Delete all quizzes from the database
        const result = await Quiz.deleteMany();

        return NextResponse.json({ message: "All quizzes deleted successfully!" });
    } catch (error) {
        console.error("Error deleting all quizzes:", error);
        return NextResponse.json({ error: "Failed to delete all quizzes." }, { status: 400 });
    }
}
