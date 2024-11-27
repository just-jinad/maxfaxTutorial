import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '@/app/models/quiz';

export async function PUT(request, { params }) {
  await connect();

  try {
    const quizData = await request.json();
    const updatedQuiz = await Quiz.findByIdAndUpdate(params.id, quizData, { new: true });
    if (!updatedQuiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }
    return NextResponse.json(updatedQuiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
    return NextResponse.json({ error: "Failed to update quiz." }, { status: 400 });
  }
}

