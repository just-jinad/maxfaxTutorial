// In api/quiz/result/route.js
import { connect } from '@/app/utils/dbConnect';
import { NextResponse } from 'next/server';
import Submission from '../../../models/submission';

export async function GET(request) {
    await connect(); // Ensure the database connection is established

    try {
        // Fetch all submissions from the database
        const submissions = await Submission.find().populate('quizId', 'title'); // Optionally populate quiz title

        return NextResponse.json(submissions);
    } catch (error) {
        console.error("Error retrieving submissions:", error);
        return NextResponse.json({ error: "Failed to fetch submissions." }, { status: 500 });
    }
}
