import mongoose from 'mongoose';

const medicineSchema = mongoose.Schema({
  name: { type: String, required: true },
  genericName: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  requiresPrescription: { type: Boolean, default: false },
  image: String,
  description: String
}, { timestamps: true });

export default mongoose.model('Medicine', medicineSchema);