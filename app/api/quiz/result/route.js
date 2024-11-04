// In api/quiz/result/route.js
import { connect } from '@/app/utils/dbConnect';
import { NextResponse } from 'next/server';
import Submission from '../../../models/submission';

export async function GET(request) {
    try {
        await connect(); // Ensure database connection

        // Fetch all submissions and return studentName and score
        const submissions = await Submission.find({}, 'studentName score quizId').sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: submissions });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return NextResponse.json({ success: false, error: 'Error fetching submissions' }, { status: 500 });
    }
}
