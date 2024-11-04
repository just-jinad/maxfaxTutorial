// In api/quiz/result/route.js
import { connect } from '@/app/utils/dbConnect';
import { NextResponse } from 'next/server';
import Submission from '../../../models/submission';

export async function GET(request) {
    try {
        // Ensure database connection is established
        await connect();
        console.log('Database connected successfully in production');

        // Fetch all submissions with only studentName, score, and subject fields
        const submissions = await Submission.find({}, 'studentName score subject').sort({ timestamp: -1 });

        // Check if submissions are retrieved
        if (!submissions || submissions.length === 0) {
            console.log('No submissions found in the database.');
            return NextResponse.json({ success: true, data: [] });
        }

        // Log the retrieved submissions for debugging
        console.log('Fetched submissions:', submissions);

        // Return the submissions as a JSON response
        return NextResponse.json({ success: true, data: submissions });
    } catch (error) {
        // Log and return the error for better debugging
        console.error('Error fetching submissions:', error);
        return NextResponse.json({ success: false, error: 'Error fetching submissions' }, { status: 500 });
    }
}
