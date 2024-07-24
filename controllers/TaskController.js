const Task = require('../models/TaskSchema');

// Add a new task
exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const newTask = new Task({ title, description, user: userId });
    await newTask.save();

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      message: 'Tasks retrieved successfully',
      tasks: tasks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.user.id;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description },
      { new: true } // Return the updated document
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({
      message: 'Task updated successfully',
      task: task
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task status by ID
// Update Task Status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const task = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({
      message: 'Task status updated successfully',
      task: task
    });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: err.message });
  }
};


// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Attempt to find and delete the task
    const task = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!task) {
      // If the task is not found or the user is unauthorized
      return res.status(404).json({
        message: 'Task not found or you are not authorized to delete this task.'
      });
    }

    // Successfully deleted the task
    res.status(200).json({
      message: 'Task deleted successfully',
      deletedTask: task
    });
  } catch (err) {
    // Handle errors that occur during the deletion process
    res.status(500).json({
      message: 'An error occurred while trying to delete the task.',
      error: err.message
    });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the task by ID and ensure it belongs to the logged-in user
    const task = await Task.findOne({ _id: id, user: userId });

    if (!task) {
      return res.status(404).json({
        message: 'Task not found or you are not authorized to view this task.'
      });
    }

    res.status(200).json({
      message: 'Task details retrieved successfully',
      task: task
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while retrieving the task details.',
      error: err.message
    });
  }
};

// Delete all tasks for the logged-in user
exports.deleteAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    // Attempt to delete all tasks for the logged-in user
    const result = await Task.deleteMany({ user: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'No tasks found to delete for this user.'
      });
    }

    res.status(200).json({
      message: 'All tasks deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while trying to delete all tasks.',
      error: err.message
    });
  }
};
