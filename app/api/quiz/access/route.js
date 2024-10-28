import { NextResponse } from "next/server";
import { connect } from '@/app/utils/dbConnect';
import Quiz from '../../../models/quiz';

export async function POST(request) {
    await connect();

    try {
        const { name, pin } = await request.json();
        
        if (!name || !pin) {
            return NextResponse.json({ error: "Name and PIN are required." }, { status: 400 });
        }

        // Fetch quiz with the matching PIN
        const quiz = await Quiz.findOne({pin} );
        if (!quiz) {
            return NextResponse.json({ error: "Invalid PIN." }, { status: 404 });
        }

        return NextResponse.json({ message: "Access granted.", quizId: quiz._id });
    } catch (error) {
        console.error("Error verifying pin:", error);
        return NextResponse.json({ error: "Failed to verify PIN." }, { status: 500 });
    }
}
