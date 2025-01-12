import mongoose from 'mongoose';

// Define the schema for options
const optionSchema = new mongoose.Schema({
    content: { type: String, trim: true }, // Option content
    type: { type: String, enum: ['plain', 'latex'], required: true }, // 'plain' or 'latex'
    isCorrect: { type: Boolean, default: false }, // Whether the option is correct
});

// Define the schema for questions
const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true, trim: true }, // Question text
    latexText: { type: String, required: true, trim: true }, // Latex text
    options: { type: [optionSchema], validate: v => v.length >= 2 }, // At least 2 options
    correctAnswer: { type: String }, // Correct answer if not options-based
    imageUrl: { type: String }, // Image associated with the question
    questionType: { type: String, enum: ['MCQ', 'Theory'], default: 'MCQ' }, // Question type
    createdAt: { type: Date, default: Date.now }, // Timestamp for creation
});

// Define the schema for quizzes
const quizSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true }, // Quiz title
    subject: { type: String, required: true, trim: true }, // Quiz subject
    pin: { type: String, unique: true }, // Unique PIN for the quiz
    questions: { type: [questionSchema], validate: v => v.length >= 1 }, // At least 1 question
    attemptLimit: { type: Number, default: 1 }, // Number of allowed attempts
    timeLimit: { type: Number, required: true }, // Time limit in minutes
    showScoresImmediately: { type: Boolean, default: false }, // Whether scores are shown immediately
    optionRender: { type: Boolean, default: false }, // Whether to render options with plain/LaTeX toggle
    createdAt: { type: Date, default: Date.now }, // Timestamp for quiz creation
});

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
