// In api/quiz/result/route.js
import { connect } from '@/app/utils/dbConnect';
import { NextResponse } from 'next/server';
import Submission from '../../../models/submission';

export async function GET(request) {
    try {
        // Ensure database connection is established
        await connect();
        console.log('Database connected successfully');

        // Fetch all submissions
        const submissions = await Submission.find().sort({ timestamp: -1 });

        // Map through the results to return only the desired fields
        const results = submissions.map(({ studentName, score }) => ({ studentName, score }));

        // Log the retrieved submissions to help with debugging
        console.log('Fetched submissions:', results);

        // Return the submissions as a JSON response
        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        // Log and return the error for better debugging
        console.error('Error fetching submissions:', error);
        return NextResponse.json({ success: false, error: 'Error fetching submissions' }, { status: 500 });
    }
}
