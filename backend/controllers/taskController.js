// CRUD operations

import Task from '../models/Task.js';  

// Create a new task
export const createTask = async (req, res) => {
    try {
        // console.log('Request body:', req.body); 
        const task = new Task(req.body);
        const savedTask = await task.save();
        // console.log('Saved task:', savedTask);
        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(400).json({ error: error.message });
    }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get tasks by category
export const getTasksByCategory = async (req, res) => {
    try {
        const tasks = await Task.find({ category: req.params.category });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get tasks by id

export const getTaskById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await Task.findById(id); // Предполагается, что Task — это ваша модель MongoDB
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching task', error });
    }
  };
  

// Update a task
export const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    createTask,
    getAllTasks,
    getTasksByCategory,
    getTaskById,
    updateTask,
    deleteTask
};