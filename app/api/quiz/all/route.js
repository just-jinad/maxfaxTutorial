// app/api/quiz/all/route.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '../../../models/quiz';

export async function GET() {
    await connect();
    
    try {
        // Fetch all quizzes from the database
        const quizzes = await Quiz.find();
        return NextResponse.json({ quizzes });
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        return NextResponse.json({ error: "Failed to fetch quizzes." }, { status: 400 });
    }
}
