// app/api/quiz/edit/[id]/route.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from "@/app/models/quiz";

export async function GET(request, { params }) {
    await connect();

    try {
        const { id } = params; // Extract quiz ID from the URL
        const quiz = await Quiz.findById(id); // Find quiz by ID

        if (!quiz) {
            return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
        }

        return NextResponse.json({ updatedQuiz: quiz }); // Return the quiz, including questions
    } catch (error) {
        console.error("Error fetching quiz:", error);
        return NextResponse.json({ error: "Failed to fetch quiz." }, { status: 400 });
    }
}

export async function PUT(request, { params }) {
    await connect();

    try {
        const { id } = params; // Extract quiz ID from the URL
        const updatedQuizData = await request.json(); // Get updated quiz data from request

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            { ...updatedQuizData }, // Directly update the entire quiz
            { new: true }
        );

        if (!updatedQuiz) {
            return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Quiz updated successfully!", updatedQuiz });
    } catch (error) {
        console.error("Error updating quiz:", error);
        return NextResponse.json({ error: "Failed to update quiz." }, { status: 400 });
    }
}
