const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'done'], // Allowed status values
    default: 'todo', // Default status for new tasks
  }
});

module.exports = mongoose.model('Task', TaskSchema);
