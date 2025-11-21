import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import Prescription from '../models/Prescription.js';

// @desc    Create new order
// @route   POST /api/orders
export const createOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, prescriptionId, address } = req.body;

  // If any item requires prescription, check approval
  const requiresRx = items.some(item => item.medicine.requiresPrescription);
  if (requiresRx && prescriptionId) {
    const prescription = await Prescription.findById(prescriptionId);
    if (prescription?.status !== 'approved') {
      return res.status(400).json({ message: 'Prescription not approved yet' });
    }
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    totalAmount,
    prescription: prescriptionId || null,
    address,
  });

  // Emit real-time event
  req.io.to('pharmacist-room').emit('newOrder', order);
  req.io.to(`user_${req.user._id}`).emit('orderUpdate', { orderId: order._id, status: 'pending' });

  res.status(201).json(order);
});

// @desc    Get my orders
// @route   GET /api/orders/my
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.medicine');
  res.json(orders);
});

// @desc    Update order status (pharmacist)
// @route   PATCH /api/orders/:id/status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;
    await order.save();

    req.io.to(`user_${order.user}`).emit('orderUpdate', { orderId: order._id, status });
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});