// app/api/quiz/create/route.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '../../../models/quiz';

const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit PIN

export async function POST(request) {
    await connect();

    try {
        const quizData = await request.json();
        const pin = generatePin(); // Generate a unique PIN
        console.log(pin)
        const newQuiz = new Quiz({ ...quizData, pin }); // Add PIN to quiz data

        await newQuiz.save();
        return NextResponse.json({ message: "Quiz created successfully!", pin });
    } catch (error) {
        console.error("Error creating quiz:", error);
        return NextResponse.json({ error: "Failed to create quiz." }, { status: 400 });
    }
}
