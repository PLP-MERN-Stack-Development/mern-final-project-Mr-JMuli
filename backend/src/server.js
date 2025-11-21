import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { protect } from './middlewares/auth.js';

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());

// Make io available in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token === 'valid-jwt-here') { // In real app validate properly
    next();
  }
});

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  const role = socket.handshake.query.role;

  if (role === 'pharmacist') socket.join('pharmacist-room');
  if (userId) socket.join(`user_${userId}`);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 10000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));