import express from 'express';
import { createOrder, getMyOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, pharmacist } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);
router.post('/', createOrder);
router.get('/my', getMyOrders);
router.patch('/:id/status', pharmacist, updateOrderStatus);

export default router;