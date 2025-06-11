import express from 'express';
import { createActivity, getActivities, completeActivity } from '../controllers/activityController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createActivity);
router.get('/', authMiddleware, getActivities);
router.put('/:id/complete', authMiddleware, completeActivity);

export default router;
