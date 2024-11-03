// models/submission.js
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    score: { type: Number, required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    timestamp: new Date(),
}, { timestamps: true });

export default mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
