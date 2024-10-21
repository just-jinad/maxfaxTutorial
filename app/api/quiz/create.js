// import dbConnect from '../../utils/dbConnect';
// import Quiz from '../../models/Quiz';
const Quiz = require('../../models/Quiz')
const dbConnect = require('../../utils/dbConnect')

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  await dbConnect();

  const { title, questions, timeframe } = req.body;

  try {
    const newQuiz = new Quiz({ title, questions, timeframe });
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error });
  }
}
