// app/api/quiz/delete/[id]/route.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from "@/app/models/quiz";

export async function DELETE(request, { params }) {
  await connect();

  // Check if 'params' and 'id' are present
  if (!params || !params.id) {
    return NextResponse.json({ error: 'Quiz ID is missing' }, { status: 400 });
  }

  const { id } = params; // Destructure 'id' from params

  try {
    // Attempt to delete quiz
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    
    // If quiz not found
    if (!deletedQuiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json({ error: 'Failed to delete quiz' }, { status: 500 });
  }
}