import { NextResponse } from "next/server";
import { connect } from "@/app/utils/dbConnect";
import Quiz from "@/app/models/quiz";
import mongoose from "mongoose";

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET Request to fetch quiz by ID
export async function GET(request, { params }) {
    await connect();

    try {
        const { id } = params;

        if (!isValidObjectId(id)) {
            return NextResponse.json({ error: "Invalid quiz ID." }, { status: 400 });
        }

        const quiz = await Quiz.findById(id);

        if (!quiz) {
            return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
        }

        return NextResponse.json({ updatedQuiz: quiz }); // Include the nested question and options structure
    } catch (error) {
        console.error(`[GET /quiz/edit/${params.id}]:`, error);
        return NextResponse.json({ error: "Failed to fetch quiz." }, { status: 500 });
    }
}

// PUT Request to update a quiz
export async function PUT(request, { params }) {
    await connect();

    try {
        const { id } = params; // Extract quiz ID from the URL
        const updatedQuizData = await request.json(); // Parse request payload

        console.log("Received Payload:", updatedQuizData);

        // Validate Root-Level Fields
        if (!updatedQuizData.title || !Array.isArray(updatedQuizData.questions)) {
            return NextResponse.json(
                { error: "Invalid payload: Title and questions are required." },
                { status: 400 }
            );
        }

        // Prepare Questions for Update
        const updatedQuestions = updatedQuizData.questions.map((question) => {
            // Validate Question Fields
            if (!question.questionText || !Array.isArray(question.options)) {
                throw new Error("Each question must have questionText and options.");
            }

            // Ensure Options Structure
            const updatedOptions = question.options.map((option) => ({
                _id: option._id || undefined, // Keep existing _id or let MongoDB assign one
                content: option.content,
                type: option.type,
                isCorrect: option.isCorrect,
            }));

            return {
                _id: question._id || undefined, // Keep existing _id or let MongoDB assign one
                questionText: question.questionText,
                latexText: question.latexText,
                options: updatedOptions,
                correctAnswer: question.correctAnswer,
                imageUrl: question.imageUrl,
                questionType: question.questionType,
            };
        });

        // Update the Quiz in Database
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            {
                ...updatedQuizData,
                questions: updatedQuestions, // Include processed questions
            },
            { new: true }
        );

        if (!updatedQuiz) {
            return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Quiz updated successfully!", updatedQuiz });
    } catch (error) {
        console.error("Error during PUT request:", error.message);
        return NextResponse.json({ error: "Failed to update quiz." }, { status: 500 });
    }
}
