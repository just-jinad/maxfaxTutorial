// app/api/quiz/delete/[id]/route.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from "@/app/models/quiz";

export async function DELETE(request, { params }) {
  await connect();

  if (!params || !params.id) {
    console.error('Quiz ID is missing');
    return NextResponse.json({ error: 'Quiz ID is missing' }, { status: 400 });
  }

  const { id } = params;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    
    if (!deletedQuiz) {
      console.error('Quiz not found:', id);
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    console.log('Quiz deleted successfully:', id);
    return NextResponse.json(
      { message: 'Quiz deleted successfully' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json({ error: 'Failed to delete quiz' }, { status: 500 });
  }
}

