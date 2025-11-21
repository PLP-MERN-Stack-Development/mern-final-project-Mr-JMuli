import asyncHandler from 'express-async-handler';
import Prescription from '../models/Prescription.js';
import { v2 as cloudinary } from 'cloudinary';

// @desc    Upload prescription
// @route   POST /api/prescriptions
export const uploadPrescription = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const uploadPromises = req.files.map(file =>
    cloudinary.uploader.upload(file.path)
  );
  const results = await Promise.all(uploadPromises);
  const images = results.map(result => result.secure_url);

  const prescription = await Prescription.create({
    user: req.user._id,
    images,
  });

  res.status(201).json(prescription);
});

// @desc    Get my prescriptions
// @route   GET /api/prescriptions/my
export const getMyPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await Prescription.find({ user: req.user._id });
  res.json(prescriptions);
});

// @desc    Approve prescription (pharmacist only)
// @route   PATCH /api/prescriptions/:id/approve
export const approvePrescription = asyncHandler(async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);
  if (!prescription) return res.status(404).json({ message: 'Not found' });

  prescription.status = 'approved';
  prescription.approvedBy = req.user._id;
  await prescription.save();

  res.json(prescription);
});