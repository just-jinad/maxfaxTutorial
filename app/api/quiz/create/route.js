import { NextResponse } from "next/server";
import { connect } from "@/app/utils/dbConnect";
import Quiz from "../../../models/quiz";

// Helper function to generate a 6-digit PIN
const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();

// Validate if the image URL is valid
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export async function POST(request) {
  try {
    // Connect to the database
    await connect();

    // Parse the incoming request body
    const quizData = await request.json();
    console.log("Received Quiz Data:", quizData);

    const {
      title,
      subject,
      questions,
      timeLimit,
      attemptLimit = 1, // Default to 1 attempt if not provided
      showScoresImmediately = false, // Default to false
      optionRender = false, // Default to false
    } = quizData;

    // Validate required fields
    if (!title || !subject || !questions || questions.length === 0 || !timeLimit) {
      return NextResponse.json(
        { error: "All required fields must be provided, including at least one question." },
        { status: 400 }
      );
    }

    // Validate the options for each question
    questions.forEach((question, idx) => {
      if (!question.options || question.options.length < 2) {
        return NextResponse.json(
          { error: `Question ${idx + 1} must have at least two options.` },
          { status: 400 }
        );
      }
      question.options.forEach((option, optIdx) => {
        if (!option.content || !option.type || !["plain", "latex"].includes(option.type)) {
          return NextResponse.json(
            { error: `Invalid option type or missing content in question ${idx + 1}, option ${optIdx + 1}.` },
            { status: 400 }
          );
        }
      });

      // Validate image URL
      if (question.imageUrl && !isValidUrl(question.imageUrl)) {
        return NextResponse.json(
          { error: `Invalid image URL for question ${idx + 1}.` },
          { status: 400 }
        );
      }
    });

    // Generate a new PIN for the quiz
    const pin = generatePin();
    console.log("Generated PIN:", pin);

    // Create a new quiz document
    const newQuiz = new Quiz({
      title,
      subject,
      questions,
      timeLimit,
      attemptLimit,
      showScoresImmediately,
      optionRender,
      pin,
      createdAt: new Date(),
    });

    console.log("New Quiz Object:", newQuiz);

    // Save the quiz to the database
    await newQuiz.save();

    // Respond with a success message and the generated PIN
    return NextResponse.json({ message: "Quiz created successfully!", pin });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      { error: "Failed to create quiz. Please try again later." },
      { status: 500 }
    );
  }
}
