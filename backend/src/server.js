import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Task Management API',
    version: '1.0.0',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
