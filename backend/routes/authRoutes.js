import express from 'express';
import * as authController from '../controllers/authController.js'; // Убедитесь, что путь правильный
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Маршруты аутентификации
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/refresh-token', authController.refreshToken);

export default router;