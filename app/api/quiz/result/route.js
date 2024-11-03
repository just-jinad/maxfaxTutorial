// In api/quiz/result/route.js
import { connect } from '@/app/utils/dbConnect';
import { NextResponse } from 'next/server';
import Submission from '../../../models/submission';

export async function GET(request) {
    await connect();
    
    try {
        const submissions = await Submission.find({}).sort({ timestamp: -1 });
        return NextResponse.json(submissions);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        return NextResponse.json({ error: 'Error fetching submissions' }, { status: 500 });
    }
}
