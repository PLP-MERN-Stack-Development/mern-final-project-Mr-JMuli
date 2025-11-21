import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { generateToken, generateRefreshToken } from '../utils/generateToken.js';

// @desc    Register user
// @route   POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User exists' });

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id);
  const refresh = generateRefreshToken(user._id);

  res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24*60*60*1000 });
  res.status(201).json({ _id: user._id, name, email, role });
});

// @desc    Login
// @route   POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    const token = generateToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24*60*60*1000 });
    res.json({ _id: user._id, name: user.name, role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});