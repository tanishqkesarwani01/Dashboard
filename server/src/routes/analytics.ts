import { Router } from 'express';
import { getAnalyticsSummary } from '../controllers/analyticsController.js';
import { requireAuth } from '../middleware/auth.js';

export const analyticsRouter = Router();

analyticsRouter.get('/summary', requireAuth, getAnalyticsSummary);
