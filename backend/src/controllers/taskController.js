import Task from '../models/Task.js';

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, due_date } = req.body;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status,
      due_date,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { user: req.user._id };

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to access this task');
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this task');
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this task');
    }

    await task.deleteOne();

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
