import { Router } from 'express';
import { createReflection, getReflections } from '../controllers/reflectionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createReflection);
router.get('/', authMiddleware, getReflections);

export default router;