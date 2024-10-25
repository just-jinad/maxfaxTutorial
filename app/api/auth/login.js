// // import { compare } from 'bcryptjs';
// // import jwt from 'jsonwebtoken';
// // import dbConnect from '../../utils/dbConnect';
// // import User from '../../models/User';

const { compare } = require('bcryptjs'); 
const jwt = require('jsonwebtoken');      
const dbConnect = require('../../utils/dbConnect'); 
const User = require('../../models/User');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { username, password } = req.body;

  await dbConnect();

  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
}
