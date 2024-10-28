// app/models/quiz.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: String,
    options: [String],
    correctAnswer: String,
    questionType: { type: String, enum: ['MCQ', 'Theory'], default: 'MCQ' },
});

const quizSchema = new mongoose.Schema({
    title: String,
    questions: [questionSchema],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
