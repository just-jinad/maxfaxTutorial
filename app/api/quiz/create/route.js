// app/api/quiz/create.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '../../../models/quiz';

// connect();
export async function POST(request) {
    await connect();

    try {
        const quizData = await request.json(); // Parse JSON from request
        const newQuiz = new Quiz(quizData);
        await newQuiz.save();
        return NextResponse.json({ message: "Quiz created successfully!" });
    } catch (error) {
        console.error("Error creating quiz:", error);
        return NextResponse.json({ error: "Failed to create quiz." }, { status: 400 });
    }
}