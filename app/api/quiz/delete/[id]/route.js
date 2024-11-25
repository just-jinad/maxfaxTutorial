// app/api/quiz/delete/[id]/route.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from "@/app/models/quiz";

export async function DELETE(request, { params }) {
  await connect();

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(params.id);
    if (!deletedQuiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    return NextResponse.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete quiz' }, { status: 500 });
  }
}
