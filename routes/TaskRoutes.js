const express = require('express');
const {
  addTask,
  getTasks,
  updateTask,
  getTaskById,
  deleteTask,
  deleteAllTasks,
  updateTaskStatus, // Ensure this is imported
} = require('../controllers/TaskController');

const auth = require('../middleware/Auth');

const router = express.Router();

router.post('/create', auth, addTask);
router.get('/list', auth, getTasks);
router.put('/update/:id', auth, updateTask);
router.patch('/updateStatus/:id', auth, updateTaskStatus); // Add this line

// Route to get a specific task by ID
router.get('/:id', auth, getTaskById);
router.delete('/delete/:id', auth, deleteTask);

// Route to delete all tasks for the logged-in user
router.delete('/deleteAll', auth, deleteAllTasks);

module.exports = router;
