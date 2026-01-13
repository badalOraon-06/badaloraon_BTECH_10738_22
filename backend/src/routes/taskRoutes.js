import express from 'express';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createTask).get(protect, getTasks);

router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
