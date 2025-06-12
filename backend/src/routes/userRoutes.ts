import { Router } from 'express';
import { getUserProfile, resetTimer } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile', authMiddleware, getUserProfile);

router.post('/reset-timer', authMiddleware, resetTimer);

export default router;
