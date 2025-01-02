import express from 'express';
import * as userController from '../controllers/userController.js'; // Убедитесь, что путь правильный
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Маршруты пользователя
router.get('/profile', authenticateToken, userController.getUserProfile);
router.put('/profile', authenticateToken, userController.updateUserProfile);
router.delete('/profile', authenticateToken, userController.deleteUser);
router.get('/debug/users', userController.debugUsers); // Вспомогательный маршрут

export default router;