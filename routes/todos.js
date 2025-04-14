const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

// Ensure the user is authenticated for all routes
router.get('/', ensureAuth, todosController.getTodos)

// Create a new todo
router.post('/create', ensureAuth, todosController.createTodo)

router.put('/markComplete', ensureAuth, todosController.markComplete)

router.put('/markIncomplete', ensureAuth, todosController.markIncomplete)

// Edit an existing todo
router.put('/edit', ensureAuth, todosController.editTodo)

// Delete a todo
router.delete('/delete', ensureAuth, todosController.deleteTodo)

module.exports = router