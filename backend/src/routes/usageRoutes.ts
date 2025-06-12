import { Router } from 'express';
import { getWeeklyUsage } from '../controllers/usageController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Define a rota GET /api/usage/weekly
// É protegida, então apenas utilizadores logados podem aceder.
router.get('/weekly', authMiddleware, getWeeklyUsage);

export default router;
