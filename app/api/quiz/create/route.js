import { NextResponse } from "next/server";
import { connect } from "@/app/utils/dbConnect";
import Quiz from "../../../models/quiz";

// Helper function to generate a 6-digit PIN
const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(request) {
  await connect(); // Connect to the database

  try {
    // Parse the incoming request body
    const quizData = await request.json();
    console.log(quizData);

    const {
      title,
      subject,
      questions,
      timeLimit,
      attemptLimit,
      showScoresImmediately = false, // Set default value to false if not provided
      optionRender = false, // Set default value to false if not provided
    } = quizData;

    // Validate required fields
    if (!title || !subject || !questions || !timeLimit) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Generate a new PIN for the quiz
    const pin = generatePin();
    console.log(pin);

    // Create new quiz object with the provided data, including the showScoresImmediately field
    const newQuiz = new Quiz({
      title,
      subject,
      questions,
      timeLimit,
      attemptLimit: attemptLimit || 1,
      showScoresImmediately, // Add the flag for showing scores immediately
      pin,
      optionRender,
      createdAt: new Date(),
    });

    console.log(newQuiz);

    // Save the quiz to the database
    await newQuiz.save();

    // Respond with the success message and the generated PIN
    return NextResponse.json({ message: "Quiz created successfully!", pin });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      { error: "Failed to create quiz." },
      { status: 400 }
    );
  }
}
