// In your API file (e.g., /app/api/quiz/[quizId]/submissions/route.js)

import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Submission from '../../../../models/submission';

// GET request to retrieve all submissions
export async function GET(request) {
    await connect();

    try {
        // Fetch all submissions from the database
        const submissions = await Submission.find({});
        
        // Return the submissions data
        return NextResponse.json(submissions);
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return NextResponse.json({ error: "Failed to fetch submissions." }, { status: 500 });
    }
}

export async function DELETE(req, res) {
    try {
      await Submission.deleteMany({}); // Deletes all documents in the collection
      return new Response(JSON.stringify({ message: 'All submissions deleted successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error deleting submissions:', error);
      return new Response(JSON.stringify({ error: 'An error occurred while deleting submissions' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
