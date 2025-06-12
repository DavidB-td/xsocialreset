import { Router } from 'express';
import { getRandomTasks } from '../controllers/dailyTaskController';

const router = Router();

// Esta rota é pública e não precisa de autenticação.
router.get('/random', getRandomTasks);

export default router;