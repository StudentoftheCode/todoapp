const Todo = require('../models/Todo')

module.exports = {
    // Get all todos for the logged-in user
    getTodos: async (req, res) => {
        try {
            const todoItems = await Todo.find({ userId: req.user.id })
            const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false })
            res.render('todos.ejs', { todos: todoItems, left: itemsLeft, user: req.user })
        } catch (err) {
            console.log(err)
            res.status(500).send('Error retrieving todos')
        }
    },

    // Create a new todo
    createTodo: async (req, res) => {
        try {
            await Todo.create({
                todo: req.body.todoItem,
                time: req.body.todoTime,
                completed: false,
                userId: req.user.id
            })
            console.log('Todo has been added!')
            res.redirect('/todos')
        } catch (err) {
            console.log(err)
            res.status(500).send('Error creating todo')
        }
    },

    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },

    // Delete a todo by ID
    deleteTodo: async (req, res) => {
        try {
            const todoId = req.body.todoIdFromJSFile
            await Todo.findOneAndDelete({ _id: todoId })
            console.log('Deleted Todo')
            res.json('Deleted It')
        } catch (err) {
            console.log(err)
            res.status(500).send('Error deleting todo')
        }
    },

    // Edit an existing todo
    editTodo: async (req, res) => {
        try {
            const updatedTodo = await Todo.findOneAndUpdate(
                { _id: req.body.id },
                { 
                    todo: req.body.updatedTask.split(" @ ")[0],  // Updating task (before the @ symbol)
                    time: req.body.updatedTask.split(" @ ")[1]   // Updating time (after the @ symbol)
                },
                { new: true } // Return the updated document
            )
            console.log('Updated Todo:', updatedTodo)
            res.json(updatedTodo)  // Sending the updated todo back as a response
        } catch (err) {
            console.log(err)
            res.status(500).send('Error updating todo')
        }
    }
}
