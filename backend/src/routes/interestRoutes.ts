import { Router } from 'express';
import {
  createInterest,
  getInterests,
  deleteInterest,
} from '../controllers/interestController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createInterest);
router.get('/', authMiddleware, getInterests);
router.delete('/:id', authMiddleware, deleteInterest);

export default router;
