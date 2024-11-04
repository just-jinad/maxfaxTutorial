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
