// app/models/quiz.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: String,
    options: [String],
    correctAnswer: String,
    imageUrl: String ,
    questionType: { type: String, enum: ['MCQ', 'Theory'], default: 'MCQ' },
});

const quizSchema = new mongoose.Schema({
    title: String,
    subject: String, // New field for the subject
    pin: { type: String, unique: true }, // New field for PIN
    questions: [questionSchema],
  
    attemptLimit: Number,
    timeLimit: Number,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);