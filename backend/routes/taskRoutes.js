import express from 'express';
const router = express.Router();

import * as taskController from '../controllers/taskController.js'; и

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/category/:category', taskController.getTasksByCategory);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/:id', taskController.getTaskById);

export default router;