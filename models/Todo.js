const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,  // Ensures 'todo' must be provided
  },
  time: {
    type: String,
    required: true,  // Ensures 'time' must be provided
  },
  completed: {
    type: Boolean,
    required: true,  
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to ObjectId, not a String
    ref: 'User',  // Reference to the User model
    required: true,
  }
});

module.exports = mongoose.model('Todo', TodoSchema);