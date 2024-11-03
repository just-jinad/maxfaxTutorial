// In api/quiz/result/route.js
import { connect } from '@/app/utils/dbConnect';
import { NextResponse } from 'next/server';
import Submission from '../../../models/submission';

export async function GET(request) {
    try {
        // Ensure database connection is established
        await connect();
        console.log('Database connected successfully');

        // Fetch all submissions and sort by timestamp without limiting fields
        const submissions = await Submission.find({}).sort({ timestamp: -1 });

        // Log the retrieved submissions to help with debugging
        console.log('Fetched submissions:', submissions);

        // Return the submissions as a JSON response
        return NextResponse.json({ success: true, data: submissions });
    } catch (error) {
        // Log and return the error for better debugging
        console.error('Error fetching submissions:', error);
        return NextResponse.json({ success: false, error: 'Error fetching submissions' }, { status: 500 });
    }
}
