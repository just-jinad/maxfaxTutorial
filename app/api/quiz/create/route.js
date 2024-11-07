// app/api/quiz/create/route.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '../../../models/quiz';

const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit PIN

export async function POST(request) {
    await connect();

    try {
        const quizData = await request.json();
        console.log(quizData)

    
        const pin = generatePin(); 
        console.log(pin);

        // Create new quiz with the timeLimit included
        const newQuiz = new Quiz({ ...quizData, pin, timeLimit: quizData.timeLimit });

        await newQuiz.save();
        return NextResponse.json({ message: "Quiz created successfully!", pin });
    } catch (error) {
        console.error("Error creating quiz:", error);
        return NextResponse.json({ error: "Failed to create quiz." }, { status: 400 });
    }
}
