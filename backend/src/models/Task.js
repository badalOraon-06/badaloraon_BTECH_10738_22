import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    due_date: {
      type: Date,
      required: [true, 'Due date is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
