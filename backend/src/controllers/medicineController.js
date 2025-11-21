import asyncHandler from 'express-async-handler';
import Medicine from '../models/Medicine.js';

// @desc    Get all medicines (with search)
// @route   GET /api/medicines
export const getMedicines = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { genericName: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const medicines = await Medicine.find(keyword);
  res.json(medicines);
});

// @desc    Get single medicine
// @route   GET /api/medicines/:id
export const getMedicineById = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);
  if (medicine) res.json(medicine);
  else res.status(404).json({ message: 'Medicine not found' });
});