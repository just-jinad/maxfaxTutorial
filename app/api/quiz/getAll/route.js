import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '@/app/models/quiz';

export async function GET() {
  await connect();

  try {
    const quizzes = await Quiz.find({}).sort({ createdAt: -1 });
    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json({ error: "Failed to fetch quizzes." }, { status: 400 });
  }
}

