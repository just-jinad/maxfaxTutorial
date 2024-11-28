// app/api/quiz/delete/[id]/route.js
import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '@/app/models/quiz';

import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '@/app/models/quiz';

export async function DELETE(request, { params }) {
  await connect();

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(params.id);
    if (!deletedQuiz) {
      return NextResponse.json({ error: "Quiz not found." }, { status: 404 });
    }

    const response = NextResponse.json({ message: "Quiz deleted successfully." });
    // Disable caching on this response
    response.headers.set('Cache-Control', 'no-store, max-age=0'); // Disable caching for this API response
    return response;

  } catch (error) {
    console.error("Error deleting quiz:", error);
    const response = NextResponse.json({ error: "Failed to delete quiz." }, { status: 400 });
    response.headers.set('Cache-Control', 'no-store, max-age=0'); // Ensure no caching even on error response
    return response;
  }
}

