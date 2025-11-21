import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
    qty: Number,
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' },
  address: String
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);